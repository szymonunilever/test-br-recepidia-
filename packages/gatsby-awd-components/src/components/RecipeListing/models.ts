import {
  Icon,
  titleLevel,
  UnileverLibraryComponent,
} from '../../models/globalModels';
import { FilterIcons, RecipeFilterOptions } from './partials';
import { CarouselConfig } from '../Carousel/models';
import { RecipeCardFavoriteCallback } from './partials/models';
import { RatingAndReviewsProvider } from '../../models/ratings&reviews';

export enum RecipeListViewType {
  Trivial,
  Carousel,
  Advanced,
  Base,
}

export interface OnFavoriteChange {
  (favorites: number[]): void;
}

export interface RecipeListingProps
  extends UnileverLibraryComponent<AppContent.RecipeListing.Content> {
  titleLevel?: titleLevel;
  initialCount?: number;
  recipePerLoad?: number;
  withFavorite?: boolean;
  favorites?: number[];
  list: Internal.Recipe[];
  icons: RecipeListingIcons;
  viewType?: RecipeListViewType;
  onFavoriteChange?: OnFavoriteChange;
  ratingProvider?: RatingAndReviewsProvider;
  tags?: RecipeFilterOptions;
  carouselConfig?: CarouselConfig;
  loadMoreConfig?: LoadMoreConfig;
  imageSizes: string;
  onViewChange?: onRecipeListingViewChanged;
  dataFetched?: boolean;
  isExternalItemLink?: boolean;
}

export type onRecipeListingViewChanged = (
  tags: Internal.Tag[],
  sortingOption: any
) => Promise<void>;

export type onLoadMore = (
  tags: Internal.Tag[],
  sortingOption: any,
  size: number
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

export interface RecipeListingCarouselProps {
  withFavorite?: boolean;
  titleLevel?: titleLevel;
  FavoriteIcon?: Icon;
  onFavoriteChange: RecipeCardFavoriteCallback;
  list: Internal.Recipe[];
  config: CarouselConfig;
  ratingProvider?: RatingAndReviewsProvider;
  imageSizes: string;
  isExternalRecipeLink?: boolean;
}

export interface RecipeListingIcons extends FilterIcons {
  favorite?: Icon;
}
