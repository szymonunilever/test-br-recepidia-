import { RatingAndReviewsProvider } from '../../models/ratings&reviews';

export interface RatingProps {
  provider: RatingAndReviewsProvider;
  className?: string;
  linkTo?: string;
  recipeId: number;
}
