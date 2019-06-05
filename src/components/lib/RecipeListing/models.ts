export interface RecipeItem {
  recipeId: string;
  originalId?: string | null;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localImage: any;
  slug: string;
}

export interface RecipeListingProps {
  className?: string;
  title?: string;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  favorites?: RecipeItem[];
  isFavoriteEnabled: boolean;
  recipeCount: number;
  currentPage?: number;
  tagList?: string[] | null;
  recipeList: RecipeItem[] | null;
  recipesPerLoad?: number;
  recipesCount?: number;
}
