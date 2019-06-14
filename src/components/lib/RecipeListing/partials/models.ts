import { FixedObject, FluidObject } from 'gatsby-image';
import { UnileverLibraryComponent } from '../../common/globalModels';

export interface LocalImage {
  id: string;
  childImageSharp: {
    fluid?: FluidObject;
    fixed?: FixedObject;
  };
}
export interface Ingredient {
  productId: number | string;
  description: string;
}
export interface RecipeItem {
  id: string;
  shortTitle: string;
  localImage: LocalImage;
  fields: {
    slug: string;
  };
  inFavorite?: boolean;
  cookingTime: number;
  preparationTime: number;
  creationTime: Date;
  ingredients: Ingredient[];
  categories: TagCategory[];
}

export interface RecipeCardFavoriteCallback {
  (selected: { id: string; val: boolean }): void;
}

export interface RecipeCardProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  id: string;
  enableSelectFavorite?: boolean;
  imgObject?: FluidObject;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  slug: string;
  inFavorite?: boolean;
  onFavoriteChange?: RecipeCardFavoriteCallback;
}

export interface RecipeListingTrivialProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  list: RecipeItem[];
  withFavorite: boolean;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
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

export interface Tag {
  id: number | string;
  language: string;
  name: string;
  path?: string;
}

export interface TagCategory {
  name: string;
  label: string;
  tags: Tag[];
}

export interface RecipeFilterOptions {
  categories: TagCategory[];
}

export interface RecipeFilterProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  allFilters: RecipeFilterOptions;
  onChangeSorting: (sort: RecipeSortingOptions) => void;
  onChangeFilter: (filter: Tag[]) => void;
  results: number;
  sortSelectPlaceholder: string;
}

export interface FilterSettingsProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  allFilters: RecipeFilterOptions;
  onFilterChange: (filter: Tag[]) => void;
  filtersSelected: Tag[];
  hidden?: boolean;
  onApply: () => void;
}
