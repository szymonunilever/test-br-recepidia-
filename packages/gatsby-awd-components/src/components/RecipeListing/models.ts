import { ReactElement } from 'react';
import { RatingAndReviewsProvider, UnileverLibraryComponent, titleLevel } from '../../models';
import { CarouselConfig } from '../Carousel/models';
import {
  RecipeAddPlaceholderProps,
  RecipeListingTrivialProps,
} from './partials';
import { FilterOptions } from '../Filter';

export enum RecipeListViewType {
  Trivial,
  Carousel,
  Advanced,
  Base,
}


export interface RecipeListingProps extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  titleLevel?: titleLevel;
  filterTitle?: string;
  ratingProvider?: RatingAndReviewsProvider;
  imageSizes: string;
  dataFetched?: boolean;
  list: Internal.Recipe[];
  initialCount?: number;
  recipePerLoad?: number;
  viewType?: RecipeListViewType;
  tags?: FilterOptions;
  carouselConfig?: CarouselConfig;
  loadMoreConfig?: LoadMoreConfig;
  onViewChange?: onRecipeListingViewChanged;
  isExternalItemLink?: boolean;
  hideFilter?: boolean;
  children?: RecipeListingTrivialProps['children'] | ReactElement<RecipeAddPlaceholderProps>[],
  brandLogoLink?: string;
}

export type onRecipeListingViewChanged = (
  tags: Internal.Tag[],
  sortingOption: any,
  filter?: string,
) => Promise<void>;

export type onLoadMore = (
  tags: Internal.Tag[],
  sortingOption: any,
  size: number,
) => Promise<void>;

export enum LoadMoreType {
  async,
  sync,
}

export interface LoadMoreConfig {
  type: LoadMoreType;
  onLoadMore?: onLoadMore;
  allCount?: number;
}

export interface RecipeListingCarouselProps extends RecipeListingTrivialProps {
  list: Internal.Recipe[];
  config: CarouselConfig;
  isExternalRecipeLink?: boolean;
}

