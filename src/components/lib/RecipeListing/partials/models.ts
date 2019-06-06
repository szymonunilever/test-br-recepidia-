import { FluidObject } from 'gatsby-image';

export interface RecipeCardFavoriteCallback {
  (selected: boolean): void;
}
export interface RecipeCardProps {
  enableSelectFavorite: boolean;
  imgObject: FluidObject;
  title: string;
  className?: string;
  slug: string;
  inFavorite?: boolean;
  onFavoriteChange?: RecipeCardFavoriteCallback;
}
