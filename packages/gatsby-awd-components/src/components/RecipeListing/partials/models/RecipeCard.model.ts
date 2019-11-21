import { ReactChildren, ReactElement } from 'react';
import { RatingAndReviewsProvider, UnileverLibraryComponent, titleLevel } from '../../../../models';
import { ButtonProps } from '../../../Button';

export interface RecipeCardProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  id: string;
  recipeId: number;
  localImage?: Internal.LocalImage;
  slug: string;
  ratingProvider: RatingAndReviewsProvider;
  imageSizes: string;
  isExternalLink?: boolean;
  children?: ReactElement<ButtonProps> | ReactElement<ButtonProps>[];
}

export interface RecipeCardLinkProps {
  target?: string;
  href?: string;
  rel?: string;
  to?: string;
  'aria-label'?: string;
  className?: string;
}
