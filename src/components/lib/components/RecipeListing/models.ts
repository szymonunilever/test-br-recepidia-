import { titleLevel, UnileverLibraryComponent } from '../globalModels';
import { RecipeFilterOptions } from './partials';
import { CarouselConfig } from '../Carousel/models';
import { RecipeCardFavoriteCallback } from './partials/models';
import { RatingAndReviewsProvider } from '../../models/ratings&reviews';
import { triggerGetSearchData } from 'src/staticPages/Search/models';

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
  getSearchData?: getSearchData;
  imageSizes: string;
}

export type getSearchData = (
  searchQuery: string,
  params: object
) => Promise<void>;

export enum LoadMoreType {
  async,
  sync,
}

export interface LoadMoreConfig {
  type: LoadMoreType;
  onLoadMore: triggerGetSearchData;
  allCount: number;
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
