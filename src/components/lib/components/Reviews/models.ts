import { RatingAndReviewsProvider } from '../../models/ratings&reviews';

export interface ReviewsProps {
  provider: RatingAndReviewsProvider;
  className?: string;
  linkTo?: string;
  recipeId: number;
}
