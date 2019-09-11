import { useElasticSearch } from '../utils';
import { SearchParams } from 'src/components/lib/components/SearchListing/models';
import keys from 'integrations/keys.json';

const filteredRecipeSearchParams = (
  query: string,
  queryStringToExclude: number[] | undefined,
  params: SearchParams,
  getOnlyRecipeCount = false
) => {
  const queryString = {
    query,
    fields: ['tagGroups.tags.id'],
  };

  return {
    index: keys.elasticSearch.recipeIndex,
    body: {
      ...params,
      query: getOnlyRecipeCount
        ? {
            // eslint-disable-next-line @typescript-eslint/camelcase
            query_string: queryString,
          }
        : {
            bool: {
              must: [
                {
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  query_string: queryString,
                },
              ],
              // eslint-disable-next-line @typescript-eslint/camelcase
              must_not: [
                {
                  terms: {
                    recipeId: queryStringToExclude,
                  },
                },
              ],
            },
          },
    },
  };
};

const recipeSearchParams = (
  searchQuery: string,
  { from, size, _source }: SearchParams
) => ({
  index: keys.elasticSearch.recipeIndex,
  body: {
    from,
    size,
    _source,
    query: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      simple_query_string: {
        query: `${searchQuery}*`,
        fields: [
          'title^5',
          'description^2',
          'tagGroups.tags.name^4',
          'ingredients.description^3',
        ],
      },
    },
  },
});

const recipeIdSearchParams = (
  searchQuery: string,
  controlArray: number[],
  { from = 0, size = 8, sort = 'asc' }: SearchParams
) => ({
  index: keys.elasticSearch.recipeIndex,
  body: {
    from,
    size,
    query: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      function_score: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        query: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          query_string: {
            query: searchQuery,
            fields: ['recipeId'],
          },
        },
        functions: [
          {
            filter: {
              terms: {
                recipeId: controlArray,
              },
            },
            // eslint-disable-next-line @typescript-eslint/camelcase
            script_score: {
              script: {
                lang: 'painless',
                params: {
                  recipeIds: controlArray,
                },
                inline: `for ( int i = 0; i < params.recipeIds.size(); i++) {if (params['_source']['recipeId'] == params.recipeIds[i]) { return (params.recipeIds.size() ${
                  sort === 'desc' ? '-' : '+'
                } i)*1000;} }`,
              },
            },
          },
        ],
        // eslint-disable-next-line @typescript-eslint/camelcase
        boost_mode: 'replace',
      },
    },
    sort: ['_score'],
  },
});

const articleSearchParams = (
  searchQuery: string,
  { from, size, _source }: SearchParams
) => ({
  index: keys.elasticSearch.articleIndex,
  body: {
    from,
    size,
    _source,
    query: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      simple_query_string: {
        query: `${searchQuery}`,
        fields: ['title^5', 'articleText.text^2'],
      },
    },
  },
});

export const getRecipesByIdsResponse = async (
  searchQuery: string,
  controlArray: number[],
  params: SearchParams
) =>
  useElasticSearch<Internal.Recipe>(
    recipeIdSearchParams(searchQuery, controlArray, params)
  );

export const getRecipeResponse = async (
  searchQuery: string,
  params: SearchParams
) => useElasticSearch<Internal.Recipe>(recipeSearchParams(searchQuery, params));

export const getArticleResponse = async (
  searchQuery: string,
  params: SearchParams
) =>
  useElasticSearch<Internal.Article>(articleSearchParams(searchQuery, params));

export const getSearchSuggestionResponse = async (
  searchQuery: string,
  { from, size }: SearchParams
) => {
  return Promise.all([
    useElasticSearch<Internal.Recipe>(
      recipeSearchParams(searchQuery, { from, size, _source: ['title'] })
    ),
    // useElasticSearch<Internal.Article>(
    //   articleSearchParams(searchQuery, { from, size, _source: ['title'] })
    // ),
  ]);
};

export const getFilteredRecipeResponse = async (
  query: string,
  queryToExclude?: number[],
  params: SearchParams = {},
  getOnlyCount = false
) =>
  useElasticSearch<Internal.Recipe>(
    filteredRecipeSearchParams(query, queryToExclude, params, getOnlyCount)
  );
