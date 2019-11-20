import { ReactElement } from 'react';
import {RatingAndReviewsProvider, titleLevel, UnileverLibraryComponent } from '../../../../models';
import { RecipeCardProps } from './RecipeCard.model';

export interface RecipeListingTrivialProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  titleLevel?: titleLevel;
  ratingProvider?: RatingAndReviewsProvider;
  imageSizes: string;
  dataFetched?: boolean;
  children?: ReactElement<RecipeCardProps>| ReactElement<RecipeCardProps>[];
}
