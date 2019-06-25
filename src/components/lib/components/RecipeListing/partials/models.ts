import { FixedObject, FluidObject } from 'gatsby-image';
import {
  titleLevel,
  UnileverLibraryComponent,
} from '../../common/globalModels';

export interface LocalImage {
  id: string;
  childImageSharp: {
    fluid?: FluidObject;
    fixed?: FixedObject;
  };
}

export interface RecipeItem extends RMSData.Recipe {
  inFavorite?: boolean;
  localImage: LocalImage;
  fields: {
    slug: string;
  };
}

export interface RecipeCardFavoriteCallback {
  (selected: { id: string; val: boolean }): void;
}

export interface RecipeCardProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  id: string;
  enableSelectFavorite?: boolean;
  localImage?: LocalImage;
  titleLevel?: titleLevel;
  slug: string;
  Icon?: JSX.Element;
  inFavorite?: boolean;
  onFavoriteChange?: RecipeCardFavoriteCallback;
}

export interface RecipeListingTrivialProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  list: RecipeItem[];
  withFavorite: boolean;
  FavoriteIcon?: JSX.Element;
  titleLevel?: titleLevel;
  onFavoriteChange?: RecipeCardFavoriteCallback;
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
  categories: RMSData.TagCategory[];
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
