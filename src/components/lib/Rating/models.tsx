export enum RatingProvider {
  kritique,
  bazaarvoice,
  none,
}

export interface RatingProps {
  rating?: RecipeRating;
  provider: RatingProvider;
  linkTo?: string;
  recipeId: string;
}

export interface RecipeRating {
  viewType: string;
  entityType: string;
  identifierValue: string;
  identifierType: string;
  uniqueId: string;
  title: string;
  entityUrl: string;
  categoryUrl: string;
}
