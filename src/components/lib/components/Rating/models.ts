export enum RatingProvider {
  kritique,
  bazaarvoice,
  none,
}

export enum RatingEntityType {
  recipe = 'recipe',
  product = 'product',
  article = 'article',
}

export enum RatingSymmaryTemplate {
  inline01 = 'inline01',
}

export interface RatingProps {
  provider: RatingProvider;
  linkTo?: string;
  recipeId: string;
}
