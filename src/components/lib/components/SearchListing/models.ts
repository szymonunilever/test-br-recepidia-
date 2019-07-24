import { SearchInputProps } from '../SearchInput/models';
import { RecipeListingProps } from '../RecipeListing/index';
import { ParsedQuery } from 'query-string';
import { getSearchData } from 'src/staticPages/Search/models';

export declare interface SearchListingProps {
  content: SearchListingContent;
  config: SearchListingConfig;
  className?: string;
  searchResultTitleLevel?: number;
  search: ParsedQuery<string> | object;
  searchResults: SearchResults;
}

export declare interface SearchResults {
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
}

export declare interface SearchListingConfig {
  searchInputConfig: SearchInputConfig;
  recipeConfig: RecipeConfig;
  articleConfig: ArticleConfig;
}

interface ArticleConfig {
  getArticleSearchData?: getSearchData;
}

interface SearchInputConfig {
  onClickSearchResultsItem?: SearchInputProps['onClickSearchResultsItem'];
  getSearchSuggestionData?: SearchInputProps['getSearchResults'];
  searchResultsCount: SearchInputProps['searchResultsCount'];
  labelIcon: SearchInputProps['labelIcon'];
  buttonResetIcon: SearchInputProps['buttonResetIcon'];
  buttonSubmitIcon: SearchInputProps['buttonSubmitIcon'];
}

interface RecipeConfig {
  getRecipeSearchData?: getSearchData;
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
  articleContent: AppContent.MediaGalleryContent;
  recipeContent: AppContent.RecipeListing.Content;
  nullResultContent: AppContent.SearchListing.NullResult;
}
