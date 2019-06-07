import { RecipeItem } from './partials';

export enum RecipeListViewType {
  Trivial,
  Base,
  Advanced,
}
export interface OnFavoriteChange {
  (favorites: string[]): void;
}
export interface RecipeListingProps {
  className?: string;
  title?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  recipeCount?: number;
  recipePerLoad?: number;
  withFavorite?: boolean;
  favorites?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadMoreButtonContent?: any;
  list: RecipeItem[];
  viewType?: RecipeListViewType;
  onFavoriteChange?: OnFavoriteChange;
}
