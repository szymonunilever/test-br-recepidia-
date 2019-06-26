import { UnileverLibraryComponent } from '../common/globalModels';
import {
  RecipeFilterOptions,
  RecipeItem,
  RecipeCardFavoriteCallback,
} from './partials';
import { CarouselConfig } from '../common/Carousel/models';

export enum RecipeListViewType {
  Trivial,
  Base,
  Advanced,
  Carousel,
}

export interface OnFavoriteChange {
  (favorites: string[]): void;
}

export interface RecipeListingProps
  extends UnileverLibraryComponent<AppContent.RecipeListing.Content> {
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  initialCount?: number;
  recipePerLoad?: number;
  withFavorite?: boolean;
  favorites?: string[];
  list: RecipeItem[];
  viewType?: RecipeListViewType;
  onFavoriteChange?: OnFavoriteChange;
  tags?: RecipeFilterOptions;
  carouselConfig?: CarouselConfig;
}

export interface RecipeListingCarouselProps
  extends UnileverLibraryComponent<AppContent.RecipeListing.Content> {
  withFavorite?: boolean;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  onFavoriteChange: RecipeCardFavoriteCallback;
  list: RecipeItem[];
  config: CarouselConfig;
}
