import { ReactElement } from 'react';
import {RatingAndReviewsProvider, titleLevel, UnileverLibraryComponent } from '../../../../models';
import { RecipeCardLinkWrapperProps } from '../../../RecipeCardLinkWrapper';
import { RecipeAddPlaceholderProps } from './RecipeAddPlaceholder.model';
import { RecipeCardProps } from '../../../RecipeCard/models';

export interface RecipeListingTrivialProps
  extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  titleLevel?: titleLevel;
  ratingProvider?: RatingAndReviewsProvider;
  imageSizes: string;
  dataFetched?: boolean;
  children?: ReactElement<RecipeCardProps>| ReactElement<RecipeCardProps>[] | ReactElement<RecipeCardLinkWrapperProps>| ReactElement<RecipeCardLinkWrapperProps>[];
  holders?: ReactElement<RecipeAddPlaceholderProps>[];
}
