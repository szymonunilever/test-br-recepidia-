import { ReactElement } from 'react';
import {RatingAndReviewsProvider, titleLevel, UnileverLibraryComponent } from '../../../../models';
import { CardLinkWrapperProps } from '../../../CardLinkWrapper';
import { RecipeAddPlaceholderProps } from './RecipeAddPlaceholder.model';
import { RecipeCardProps } from '../../../RecipeCard';

export interface RecipeListingTrivialProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  titleLevel?: titleLevel;
  ratingProvider?: RatingAndReviewsProvider;
  imageSizes: string;
  dataFetched?: boolean;
  children?: ReactElement<RecipeCardProps>| ReactElement<RecipeCardProps>[] | ReactElement<CardLinkWrapperProps>| ReactElement<CardLinkWrapperProps>[];
  holders?: ReactElement<RecipeAddPlaceholderProps>[];
}
