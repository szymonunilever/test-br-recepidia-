import { FluidObject } from 'gatsby-image';

export interface RecipeCardFavoriteCallback {
  (selected: boolean): void;
}
export interface RecipeCardProps {
  enableSelectFavorite: boolean;
  imgObject: FluidObject;
  title: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  slug: string;
  inFavorite?: boolean;
  onFavoriteChange?: RecipeCardFavoriteCallback;
}
