import keys from 'integrations/keys.json';
import { SearchResponse } from './models';

class Client {
  public host = '';
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor(host: string) {
    this.host = host;
  }

  public search<T>({
    body,
    index,
  }: {
    body: object;
    index: string;
  }): Promise<SearchResponse<T>> {
    return fetch(`${this.host}/${index}/_search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(response => response.json())
      .then((res: SearchResponse<T>) => res);
  }
}

const client = new Client(keys.elasticSearch.url);

const useElasticSearch = async <T>(
  searchBody: object
): Promise<SearchResponse<T>> => {
  return await client
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
