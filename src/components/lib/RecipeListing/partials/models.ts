import { FixedObject, FluidObject } from 'gatsby-image';
import { ButtonContent } from '../../common/Button';
import { UnileverLibraryComponent } from '../../common/globalModels';
import { OptionLabels, RecipeListingContent } from '../models';
import { RecomendationContent } from '../../Recommendations';

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

export interface RecipeCardProps extends UnileverLibraryComponent {
  id: string;
  enableSelectFavorite?: boolean;
  imgObject?: FluidObject;
  title: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  slug: string;
  inFavorite?: boolean;
  onFavoriteChange?: RecipeCardFavoriteCallback;
}

export interface RecipeListingTrivialProps extends UnileverLibraryComponent {
  list: RecipeItem[];
  withFavorite: boolean;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  onFavoriteChange?: RecipeCardFavoriteCallback;
  content: RecomendationContent;
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
  categoryName: string;
  path?: string;
}

export interface TagCategory {
  categoryName: string;
  label: string;
  tags: Tag[];
}

export interface RecipeFilterOptions {
  categories: TagCategory[];
}

export interface RecipeFilterProps extends UnileverLibraryComponent {
  allFilters: RecipeFilterOptions;
  onChangeSorting: (sort: RecipeSortingOptions) => void;
  onChangeFilter: (filter: Tag[]) => void;
  results: number;
  resultLabel: string;
  resultLabelPlural: string;
  optionLabels: OptionLabels;
  content: { resetLabel?: ButtonContent; applyLabel?: ButtonContent };
  sortSelectPlaceholder: string;
}

export interface FilterSettingsProps extends UnileverLibraryComponent {
  allFilters: RecipeFilterOptions;
  onFilterChange: (filter: Tag[]) => void;
  filtersSelected: Tag[];
  hidden?: boolean;
  onApply: () => void;
  filterButtonsLabel: {
    resetLabel?: ButtonContent;
    applyLabel?: ButtonContent;
  };
}
