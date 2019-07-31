export interface SearchResponse<T> {
  hits: {
    hits: Hit<T>[];
    total: number;
  };
}

export interface Hit<T> {
  _source: T;
}

export type NameList = string | string[] | boolean;

export interface SearchParams {
  index: string;
  body?: any;
}
