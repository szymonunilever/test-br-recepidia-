import { SearchParams } from 'elasticsearch';

declare interface UseElasticSearchProps extends SearchParams {
  query: any;
}
