export interface SearchResponse<T> {
  hits: {
    hits: Hit<T>[];
    total: number;
  };
}

export interface Hit<T> {
  _source: T;
}
