//@ts-ignore
import elasticsearch from 'elasticsearch-browser';
import keys from 'integrations/keys.json';
import { SearchResponse, Client, SearchParams } from 'elasticsearch';
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

const useElasticSearch = async <T>(
  searchBody: SearchParams
): Promise<SearchResponse<T>> => {
  return await getClient()
    .search<T>({
      index: keys.elasticSearch.index,
      body: searchBody,
    })
    .then((resp: SearchResponse<T>) => resp)
    .catch(err => {
      throw new Error(err);
    });
};

export default useElasticSearch;
