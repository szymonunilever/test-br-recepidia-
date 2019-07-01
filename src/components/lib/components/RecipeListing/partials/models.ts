import { RatingProvider } from '../../Rating/models';
import {
  titleLevel,
  UnileverLibraryComponent,
} from '../../common/globalModels';

export interface RecipeCardFavoriteCallback {
  (selected: { id: string; val: boolean }): void;
}

export interface RecipeCardProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  id: string;
  recipeId: string;
  enableSelectFavorite?: boolean;
  localImage?: Internal.LocalImage;
  titleLevel?: titleLevel;
  slug: string;
  Icon?: JSX.Element;
  inFavorite?: boolean;
  onFavoriteChange?: RecipeCardFavoriteCallback;
  ratingProvider: RatingProvider;
}

export interface RecipeListingTrivialProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  list: Internal.Recipe[];
  withFavorite: boolean;
  FavoriteIcon?: JSX.Element;
  titleLevel?: titleLevel;
  onFavoriteChange?: RecipeCardFavoriteCallback;
  ratingProvider?: RatingProvider;
}

export enum RecipeSortingOptions {
  preparationTime,
  cookingTime,
  averageRating,
  newest,
  recentlyUpdated,
  title,
}

export interface RecipeFilterOptions {
  tagGroups: RMSData.TagGroup[];
}

export interface RecipeFilterProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  allFilters: RecipeFilterOptions;
  onChangeSorting: (sort: RecipeSortingOptions) => void;
  onChangeFilter: (filter: RMSData.Tag[]) => void;
  results: number;
  sortSelectPlaceholder: string;
  OpenIcon?: JSX.Element;
  FilterIcon?: JSX.Element;
  RemoveTagIcon?: JSX.Element;
}

export interface FilterSettingsProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  allFilters: RecipeFilterOptions;
  onFilterChange: (filter: RMSData.Tag[]) => void;
  filtersSelected: RMSData.Tag[];
  hidden?: boolean;
  OpenIcon?: JSX.Element;
  CloseIcon?: JSX.Element;
  onApply: () => void;
}
