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
          'title',
          'description',
          'tagGroups.tags.name',
          'ingredients.description',
        ],
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
        fields: ['title', 'articleText.text'],
      },
    },
  },
});

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
