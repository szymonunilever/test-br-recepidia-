import useElasticSearch from './useElasticSearch/index';
import { SearchParams } from 'src/components/lib/components/SearchListing/models';
import keys from 'integrations/keys.json';

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
      query_string: {
        query: `*${searchQuery}*`,
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
  { from = 0, size = 8 }: SearchParams
) => ({
  index: keys.elasticSearch.recipeIndex,
  body: {
    from,
    size,
    query: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      query_string: {
        query: searchQuery,
        fields: ['recipeId'],
      },
    },
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
      query_string: {
        query: `*${searchQuery}*`,
        fields: ['title^5', 'articleText.text^2'],
      },
    },
  },
});

export const getRecipeFavoritesResponse = async (
  searchQuery: string,
  params: SearchParams
) =>
  useElasticSearch<Internal.Recipe>(recipeIdSearchParams(searchQuery, params));

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
    useElasticSearch<Internal.Article>(
      articleSearchParams(searchQuery, { from, size, _source: ['title'] })
    ),
  ]);
};
