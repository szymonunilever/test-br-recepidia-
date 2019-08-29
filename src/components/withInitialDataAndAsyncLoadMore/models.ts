import { onLoadMore } from '../lib/components/RecipeListing';

export interface WithInitialDataAndAsyncLoadMore {
  tagList: Internal.Tag[];
  recipeResultsList: Internal.Recipe[];
  recipeResultsCount: number;
  onLoadMoreRecipes: onLoadMore;
  initialRecipesCount: number;
  dataFetched: boolean;
  onSortedRecipeLoadMore: () => Promise<any>;
  onViewChange: () => Promise<any>;
  getRecipeSearchData: () => Promise<any>;
  setDataFetched: (isFetched: boolean) => void;
  setRecipeResultsList: (recipes: Internal.Recipe[]) => void;
  setRecipeResultsCount: (count: number) => void;
}
