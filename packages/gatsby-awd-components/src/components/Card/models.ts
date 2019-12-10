import { ReactChild, ReactElement } from 'react';
import { Icon, RatingAndReviewsProvider, UnileverLibraryComponent } from '../../models';
import { ButtonProps } from '../Button';
import { RatingProps } from '../Rating';

export interface CardProps {
  key: string;
  content: CardContentProps;
  idPropertyName: string;
  ratingWidget?: ReactElement<RatingProps>
  imageSizes: string;
  className?: string;
  brand?: ReactChild;
  children?: ReactElement<ButtonProps> | ReactElement<ButtonProps>[];
}

export interface CardContentProps {
  fields:{
    slug: string
  };
  name?: string;
  title?: string;
  localImage?: Internal.LocalImage;
  images?: Internal.LocalImage[];
  averageRating?: number;
  [key: string]: any;
}

interface CardWrapper {
  key: string;
  children: ReactElement<CardProps>;
  ratingProvider: RatingAndReviewsProvider;
}

export interface RecipeCardWrapperProps extends CardWrapper{}

export interface ProductCardWrapperProps extends CardWrapper{
  mainImageIndex?: number;
}
