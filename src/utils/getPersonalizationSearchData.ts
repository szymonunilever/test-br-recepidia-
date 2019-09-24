import { useElasticSearch } from './index';

export const RESULT_SIZE = 6;
export const FROM = 0;

function getPersonalizationSearchData(
  searchQuery: string,
  {
    from = FROM,
    size = RESULT_SIZE,
    sort = [],
  }: { from: number; size: number; sort: any[] }
) {
  const searchParams = {
    index: process.env['elasticSearch_recipeIndex'] as string,
    body: {
      from,
      size,
      sort,
      query: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        query_string: {
          query: `${searchQuery}`,
        },
      },
    },
  };
  return useElasticSearch<Internal.Recipe>(searchParams);
}

export default getPersonalizationSearchData;
