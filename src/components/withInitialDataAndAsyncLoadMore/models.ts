export interface QueryString {
  query: string;
  fields?: string[];
}

export interface WithInitialDataAndAsyncLoadMore {
  tagList: Internal.Tag[];
  recipeResultsList: Internal.Recipe[];
  recipeResultsCount: number;
  onLoadMoreRecipes: OnLoadMoreRecipes;
  initialRecipesCount: number;
  dataFetched: boolean;
  onSortedRecipeLoadMore: () => Promise<any>;
  onViewChange: () => Promise<any>;
  getRecipeSearchData: () => Promise<any>;
  setDataFetched: (isFetched: boolean) => void;
  setRecipeResultsList: (recipes: Internal.Recipe[]) => void;
  setRecipeResultsCount: (count: number) => void;
}

type OnLoadMoreRecipes = (
  tags: Internal.Tag[],
  sort: string,
  size: number,
  queryString?: QueryString
) => Promise<void>;
