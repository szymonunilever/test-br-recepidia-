import { ReactElement } from 'react';
import { RatingAndReviewsProvider, UnileverLibraryComponent} from '../../models';
import { ButtonProps } from '../Button';

export interface RecipeCardProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  id: string;
  recipeId: number;
  averageRating?: number;
  slug: string;
  localImage?: Internal.LocalImage;
  ratingProvider: RatingAndReviewsProvider;
  imageSizes: string;
  children?: ReactElement<ButtonProps> | ReactElement<ButtonProps>[];
}


