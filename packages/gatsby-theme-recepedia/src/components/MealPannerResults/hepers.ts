import { useElasticSearch } from '../../utils';

export function getCustomMPSearch(
  searchQuery: string,
  {
    from = 0,
    size = 10,
    sort = [{ averageRating: { order: 'desc' } }],
    fields = [
      'title^5',
      'description^2',
      'tagGroups.tags.name^4',
      'ingredients.description^3',
    ],
  },
  exclude: number[]
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
          // eslint-disable-next-line @typescript-eslint/camelcase
          must_not: [
            {
              terms: {
                recipeId: exclude,
              },
            },
          ],
        },
      },
    },
  };
  return useElasticSearch<Internal.Recipe>(searchParams);
}
