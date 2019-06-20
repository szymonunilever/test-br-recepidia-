import { UnileverLibraryComponent } from '../common/globalModels';
import { RecipeFilterOptions, RecipeItem } from './partials';

export enum RecipeListViewType {
  Trivial,
  Base,
  Advanced,
}

export interface OnFavoriteChange {
  (favorites: string[]): void;
}

export interface RecipeListingProps
  extends UnileverLibraryComponent<AppContent.RecipeListing.Content> {
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  initialCount?: number;
  recipePerLoad?: number;
  withFavorite?: boolean;
  favoriteIcon?: JSX.Element;
  OpenIcon?: JSX.Element;
  favorites?: string[];
  list: RecipeItem[];
  viewType?: RecipeListViewType;
  onFavoriteChange?: OnFavoriteChange;
  tags?: RecipeFilterOptions;
}
