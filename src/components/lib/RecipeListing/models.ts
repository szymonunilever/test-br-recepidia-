import { ButtonContent } from '../common/Button';
import { UnileverLibraryComponent } from '../common/globalModels';
import { RecipeFilterOptions, RecipeItem } from './partials';
import { RecomendationContent } from '../Recommendations';

export enum RecipeListViewType {
  Trivial,
  Base,
  Advanced,
}

export interface OnFavoriteChange {
  (favorites: string[]): void;
}

export interface OptionLabels {
  preparationTime: string;
  cookingTime: string;
  averageRating: string;
  newest: string;
  recentlyUpdated: string;
  title: string;
  [key: string]: string;
}

export interface RecipeListingContent {
  title?: string;
  resultLabel?: string;
  resultLabelPlural?: string;
  optionLabels?: OptionLabels;
  sortSelectPlaceholder?: string;
  cta?: ButtonContent;
  nullResult: RecomendationContent;
  filtersCta?: {
    resetLabel?: ButtonContent;
    applyLabel?: ButtonContent;
  };
}

export interface RecipeListingProps extends UnileverLibraryComponent {
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  initialCount?: number;
  recipePerLoad?: number;
  withFavorite?: boolean;
  content: RecipeListingContent;
  favorites?: string[];
  list: RecipeItem[];
  viewType?: RecipeListViewType;
  onFavoriteChange?: OnFavoriteChange;
  tags?: RecipeFilterOptions;
}
