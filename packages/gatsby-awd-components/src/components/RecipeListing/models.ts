import { ReactElement } from 'react';
import { RatingAndReviewsProvider, UnileverLibraryComponent, titleLevel } from '../../models';
import { CarouselConfig } from '../Carousel/models';
import {
  FilterIcons,
  RecipeAddPlaceholderProps,
  RecipeFilterOptions,
  RecipeListingTrivialProps,
} from './partials';

export enum RecipeListViewType {
  Trivial,
  Carousel,
  Advanced,
  Base,
}


export interface RecipeListingProps extends UnileverLibraryComponent<Partial<AppContent.RecipeListing.Content>> {
  titleLevel?: titleLevel;
  ratingProvider?: RatingAndReviewsProvider;
  imageSizes: string;
  dataFetched?: boolean;
  list: Internal.Recipe[];
  initialCount?: number;
  recipePerLoad?: number;
  filterTitle?: string;
  icons: FilterIcons;
  viewType?: RecipeListViewType;
  tags?: RecipeFilterOptions;
  carouselConfig?: CarouselConfig;
  loadMoreConfig?: LoadMoreConfig;
  onViewChange?: onRecipeListingViewChanged;
  isExternalItemLink?: boolean;
  children?: RecipeListingTrivialProps['children'] | ReactElement<RecipeAddPlaceholderProps>[]
}

export type onRecipeListingViewChanged = (
  tags: Internal.Tag[],
  sortingOption: any,
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

