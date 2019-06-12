import { UnileverLibraryComponent } from '../common/globalModels';
import { RecipeItem } from './partials';

export enum RecipeListViewType {
  Trivial,
  Base,
  Advanced,
}

export interface OnFavoriteChange {
  (favorites: string[]): void;
}

export interface RecipeListingProps
  extends UnileverLibraryComponent<UnileverComponents.RecipeListingContent> {
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  initialCount?: number;
  recipePerLoad?: number;
  withFavorite?: boolean;
  favorites?: string[];
  list: RecipeItem[];
  viewType?: RecipeListViewType;
  onFavoriteChange?: OnFavoriteChange;
}
