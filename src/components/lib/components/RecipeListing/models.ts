import { titleLevel, UnileverLibraryComponent } from '../globalModels';
import { RecipeFilterOptions } from './partials';
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
  (favorites: string[]): void;
}

export interface RecipeListingProps
  extends UnileverLibraryComponent<AppContent.RecipeListing.Content> {
  titleLevel?: titleLevel;
  initialCount?: number;
  recipePerLoad?: number;
  withFavorite?: boolean;
  FavoriteIcon?: JSX.Element;
  OpenIcon?: JSX.Element;
  RemoveTagIcon?: JSX.Element;
  FilterIcon?: JSX.Element;
  favorites?: string[];
  list: Internal.Recipe[];
  viewType?: RecipeListViewType;
  onFavoriteChange?: OnFavoriteChange;
  ratingProvider?: RatingAndReviewsProvider;
  tags?: RecipeFilterOptions;
  carouselConfig?: CarouselConfig;
  loadMoreConfig?: LoadMoreConfig;
  imageSizes: string;
  onViewChange?: onRecipeListingViewChanged;
  dataFetched?: boolean;
}

export type onRecipeListingViewChanged = (
  tags: Internal.Tag[],
  sortingOption: string
) => Promise<void>;

export type onLoadMore = (
  tags: Internal.Tag[],
  sortingOption: string,
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
  FavoriteIcon?: JSX.Element;
  onFavoriteChange: RecipeCardFavoriteCallback;
  list: Internal.Recipe[];
  config: CarouselConfig;
  ratingProvider?: RatingAndReviewsProvider;
  imageSizes: string;
}
