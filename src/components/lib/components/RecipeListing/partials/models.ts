import { titleLevel, UnileverLibraryComponent } from '../../globalModels';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';

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
  ratingProvider: RatingAndReviewsProvider;
  imageSizes: string;
}

export interface RecipeListingTrivialProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  list: Internal.Recipe[];
  withFavorite: boolean;
  FavoriteIcon?: JSX.Element;
  titleLevel?: titleLevel;
  onFavoriteChange?: RecipeCardFavoriteCallback;
  ratingProvider?: RatingAndReviewsProvider;
  imageSizes: string;
}

export enum RecipeSortingOptions {
  preparationTime,
  cookingTime,
  averageRating,
  newest,
  recentlyUpdated,
  title,
}

export const RecipeSortingOptionsFieldsMappings = {
  [RecipeSortingOptions.preparationTime]: 'recipeDetails.preperationTime',
  [RecipeSortingOptions.cookingTime]: 'recipeDetails.cookTime',
  [RecipeSortingOptions.averageRating]: 'rating.averageRating',
  [RecipeSortingOptions.newest]: 'creationTime',
  [RecipeSortingOptions.recentlyUpdated]: 'creationTime',
  [RecipeSortingOptions.title]: 'title',
};

export interface RecipeFilterOptions {
  tagGroups: Internal.TagGroup[];
}

export interface RecipeFilterProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  allFilters: RecipeFilterOptions;
  onChangeSorting: (sort: RecipeSortingOptions) => void;
  onChangeFilter: (filter: Internal.Tag[]) => void;
  results: number;
  sortSelectPlaceholder: string;
  OpenIcon?: JSX.Element;
  FilterIcon?: JSX.Element;
  RemoveTagIcon?: JSX.Element;
}

export interface FilterSettingsProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  allFilters: RecipeFilterOptions;
  onFilterChange: (filter: Internal.Tag[]) => void;
  filtersSelected: Internal.Tag[];
  hidden?: boolean;
  OpenIcon?: JSX.Element;
  CloseIcon?: JSX.Element;
  onApply: () => void;
}
