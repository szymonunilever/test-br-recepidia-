import { FixedObject, FluidObject } from 'gatsby-image';
import { UnileverLibraryComponent } from '../../common/globalModels';

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

export interface Dietary {
  vegan: { stateValue: boolean };
  nutFree: { stateValue: boolean };
  dairyProductFree: { stateValue: boolean };
  eggFree: { stateValue: boolean };
  paleoFree: { stateValue: boolean };
  pregnancySafe: { stateValue: boolean };
  rawFood: { stateValue: boolean };
  lactoseFree: { stateValue: boolean };
  glutenFree: { stateValue: boolean };
  vegetarian: { stateValue: boolean };
  wheatFree: { stateValue: boolean };
}

export interface RecipeFilterOptions {
  dishes: Tag[];
  mainIngredients: Tag[];
  cuisines: Tag[];
  difficulties: Tag[];
  dietary: Dietary;
  budgets: Tag[];
}

export interface RecipeFilterProps {
  onChangeSorting: (sort: RecipeSortingOptions) => void;
  onChangeFilter: (filter: RecipeFilterOptions) => void;
  onTagRemove: (val: string | number) => void;
}
