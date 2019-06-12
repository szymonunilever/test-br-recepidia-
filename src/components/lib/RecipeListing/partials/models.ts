import { FixedObject, FluidObject } from 'gatsby-image';
import { UnileverLibraryComponent } from '../../common/globalModels';
import { OptionLabels } from '../models';

export interface LocalImage {
  id: string;
  childImageSharp: {
    fluid?: FluidObject;
    fixed?: FixedObject;
  };
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

export interface RecipeListingTrivialProps {
  list: RecipeItem[];
  withFavorite: boolean;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  onFavoriteChange?: RecipeCardFavoriteCallback;
}

export enum RecipeSortingOptions {
  PreparationTime,
  CookingTime,
  AverageRating,
  Newest,
  RecentlyUpdated,
  Title,
}

export interface Tag {
  id: number;
  language: string;
  categoryName: string;
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
  sortSelectPlaceholder: string;
}
