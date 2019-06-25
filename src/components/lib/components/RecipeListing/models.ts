import { RatingProvider } from '../Rating';
import { titleLevel, UnileverLibraryComponent } from '../common/globalModels';
import { RecipeFilterOptions, RecipeItem } from './partials';

export enum RecipeListViewType {
  Trivial,
  Base,
  Advanced,
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
  list: RecipeItem[];
  viewType?: RecipeListViewType;
  onFavoriteChange?: OnFavoriteChange;
  ratingProvider?: RatingProvider;
  tags?: RecipeFilterOptions;
}
