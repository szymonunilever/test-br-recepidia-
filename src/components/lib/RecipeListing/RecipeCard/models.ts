export interface RecipeCardFavoriteCallback {
  (selected: boolean): void;
}
export interface RecipeCardProps {
  enableSelectFavorite: boolean;
  recipeImgPath: string;
  title: string;
  className?: string;
  slug: string;
  inFavorite?: boolean;
  onFavoriteChange?: RecipeCardFavoriteCallback;
}
