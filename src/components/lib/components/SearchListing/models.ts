import { SearchResponse, Explanation } from 'elasticsearch';
import { SearchInputProps } from '../SearchInput/models';
import { RecipeListingProps } from '../RecipeListing';

export declare interface SearchListingProps {
  content: SearchListingContent;
  config: SearchListingConfig;
  getSearchData: getSearchData;
  className?: string;
  searchResultTitleLevel?: number;
}

export type getSearchData = (
  searchQuery: string,
  params: object
) => Promise<SearchResponse<Internal.Recipe>>;

export declare interface SearchListingConfig {
  searchInputConfig: SearchInputConfig;
  recipesConfig: RecipesConfig;
}

interface SearchInputConfig {
  searchResultsCount: SearchInputProps['searchResultsCount'];
  labelIcon: SearchInputProps['labelIcon'];
  buttonResetIcon: SearchInputProps['buttonResetIcon'];
  buttonSubmitIcon: SearchInputProps['buttonSubmitIcon'];
  onSubmit: SearchInputProps['onSubmit'];
}

interface RecipesConfig {
  viewType: RecipeListingProps['viewType'];
  FavoriteIcon: RecipeListingProps['FavoriteIcon'];
  withFavorite: RecipeListingProps['withFavorite'];
  initialCount: RecipeListingProps['initialCount'];
  recipePerLoad: RecipeListingProps['recipePerLoad'];
  favorites: RecipeListingProps['favorites'];
  onFavoriteChange: RecipeListingProps['onFavoriteChange'];
}

export declare interface SearchListingContent {
  searchListingContent: AppContent.SearchListing.Content;
  searchInputContent: AppContent.SearchInput.Content;
  tabsContent: AppContent.Tabs.Content;
  recipesContent: AppContent.RecipeListing.Content;
  nullResultContent: AppContent.SearchListing.NullResult;
}

export declare interface ResponseRecipeData<T> {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: T;
  _version?: number;
  _explanation?: Explanation;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  highlight?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inner_hits?: any;
  matched_queries?: string[];
  sort?: string[];
}
