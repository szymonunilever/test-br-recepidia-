export interface QueryString {
  query: string;
  fields?: string[];
}

export interface WithArticleAsyncLoadMore {
  tagList: Internal.Tag[];
  articleResultsList: Internal.Article[];
  articleResultsCount: number;
  onLoadMoreArticles: OnLoadMoreArticles;
  dataFetched: boolean;
  onSortedArticleLoadMore: () => Promise<any>;
  onViewChange: () => Promise<any>;
  getArticleSearchData: () => Promise<any>;
  setDataFetched: (isFetched: boolean) => void;
  setArticleResultsList: (articles: Internal.Article[]) => void;
  setArticleResultsCount: (count: number) => void;
}

type OnLoadMoreArticles = (from: number, size: number) => Promise<void>;
