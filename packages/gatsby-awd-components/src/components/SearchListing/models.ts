import { ButtonProps } from '../Button';
import { SearchInputProps } from '../SearchInput';
import { RecipeListingProps, onRecipeListingViewChanged } from '../RecipeListing';
import { FilterIcons, FilterOptions } from '../Filter';

export declare interface SearchListingProps {
  content: SearchListingContent;
  config: SearchListingConfig;
  className?: string;
  searchResultTitleLevel?: number;
  searchQuery: string;
  searchResults: SearchResults;
  filterTitle?: string;
  brandLogoLink?: string;
}

export declare interface SearchResults {
  recipeResultsFetched?: boolean;
  articleResultsFetched?: boolean;
  productResultsFetched?: boolean;
  recipeResults: {
    list: Internal.Recipe[];
    count: number;
  };
  searchInputResults: {
    list: SearchInputProps['searchResults'];
    count: number;
  };
  articleResults: {
    list: Internal.Article[];
    count: number;
  };
  productResults: {
    list: Internal.Product[];
    count: number;
  };
}

export declare interface SearchListingConfig {
  searchInputConfig: SearchInputConfig;
  recipeConfig: RecipeConfig;
  articleConfig: ArticleConfig;
  productConfig: ProductConfig;
}

interface ArticleConfig {
  getArticleSearchData?: getSearchData;
  onArticleViewChange: onRecipeListingViewChanged;
  initialCount: number;
  articlePerLoad: number;
}

interface ProductConfig {
  getProductSearchData?: getSearchData;
  onProductViewChange: onRecipeListingViewChanged;
  initialCount: number;
  productPerLoad: number;
}

interface SearchInputConfig {
  onClickSearchResultsItem?: SearchInputProps['onClickSearchResultsItem'];
  getSearchSuggestionData?: SearchInputProps['getSearchResults'];
  searchResultsCount: SearchInputProps['searchResultsCount'];
  labelIcon: SearchInputProps['labelIcon'];
  buttonResetIcon: SearchInputProps['buttonResetIcon'];
  buttonSubmitIcon: SearchInputProps['buttonSubmitIcon'];
  searchPagePath: SearchInputProps['searchPagePath']
}

interface RecipeConfig {
  getRecipeSearchData?: getSearchData;
  viewType: RecipeListingProps['viewType'];
  icons: FilterIcons;
  // withFavorite: RecipeListingProps['withFavorite'];
  initialCount: RecipeListingProps['initialCount'];
  recipePerLoad: RecipeListingProps['recipePerLoad'];
  favorites: number[];
  onFavoriteChange: (val:boolean, recipeId:number)=>void;
  recipeCardButtonPropsDefault: ButtonProps;
  imageSizes: RecipeListingProps['imageSizes'];
  ratingProvider?: RecipeListingProps['ratingProvider'];
  onViewChange?: onRecipeListingViewChanged;
  tags?: FilterOptions,
  showFilters: boolean,
}

export declare interface SearchListingContent {
  searchListingContent: AppContent.SearchListing.Content;
  searchInputContent: AppContent.SearchInput.Content;
  tabsContent: AppContent.Tabs.Content;
  articleContent: AppContent.MediaGalleryContent;
  recipesContent: AppContent.RecipeListing.Content;
  productContent: AppContent.ProductListingContent;
  nullResultContent: AppContent.SearchListing.NullResult;
}

export type triggerGetSearchData = (size: number) => void;
export type getSearchData = (
  searchQuery: string,
  params: SearchParams,
  filter?: string
) => Promise<void>;

export interface SearchParams {
  from?: number;
  size?: number;
  sort?: string;
  _source?: string[];
}

export declare interface ResponseRecipeData<T> {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: T;
  _version?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  highlight?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inner_hits?: any;
  matched_queries?: string[];
  sort?: string[];
}
