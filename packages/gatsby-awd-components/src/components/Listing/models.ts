import { ReactElement } from 'react';
import { titleLevel, UnileverLibraryComponent } from '../../models';
import { CardProps, ProductCardWrapperProps, RecipeCardWrapperProps } from '../Card';
import { CardLinkWrapperProps } from '../CardLinkWrapper';
import { RecipeAddPlaceholderProps } from '../RecipeListing/partials/models';

export interface ListingProps extends UnileverLibraryComponent<AppContent.ListingContent>{
  titleLevel?: titleLevel;
}
