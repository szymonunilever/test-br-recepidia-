import { ButtonContent } from '../common/Button';
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

export interface RecipeListingContent {
  title?: string;
  cta?: ButtonContent;
}

export interface RecipeListingProps extends UnileverLibraryComponent {
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  initialCount?: number;
  recipePerLoad?: number;
  withFavorite?: boolean;
  content: RecipeListingContent;
  favorites?: string[];
  list: RecipeItem[];
  viewType?: RecipeListViewType;
  onFavoriteChange?: OnFavoriteChange;
}
