//@ts-ignore
import elasticsearch from 'elasticsearch-browser';
import keys from 'integrations/keys.json';
import { UseElasticSearchProps } from './models';
import { SearchResponse, Client } from 'elasticsearch';
//@ts-ignore
let client: Client = null;

const getClient = (): Client => {
  client =
    client ||
    new elasticsearch.Client({
      host: keys.elasticSearch.url,
    });

  return client;
};

const useElasticSearch = async (searchBody: UseElasticSearchProps) => {
  return await getClient()
    .search({
      index: keys.elasticSearch.index,
      body: searchBody,
    })
    .then((resp: SearchResponse<unknown>) => resp)
    .catch((err: any) => {
      throw new Error(err);
    });
};

export default useElasticSearch;
