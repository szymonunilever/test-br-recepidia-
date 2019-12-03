import { RatingAndReviewsProvider } from '../../models';

export interface RatingProps {
  provider: RatingAndReviewsProvider;
  className?: string;
  linkTo?: string;
  recipeId: number;
  averageRating?: number;
}
