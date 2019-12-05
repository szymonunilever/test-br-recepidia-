import { useElasticSearch } from '../../utils';

export function getCustomMPSearch(
  searchQuery: string,
  {
    from = 0,
    size = 3000,
    sort = [{ averageRating: { order: 'desc' } }],
    fields = ['title'],
  }
) {
  const searchParams = {
    index: process.env['elasticSearch_recipeIndex'] as string,
    body: {
      from,
      size,
      //sort,
      query: {
        bool: {
          must: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            query_string: {
              // eslint-disable-next-line @typescript-eslint/camelcase
              analyze_wildcard: true,
              query: `${searchQuery}*`,
              fields,
            },
          },
        },
      },
    },
  };
  return useElasticSearch<Internal.Recipe>(searchParams);
}
