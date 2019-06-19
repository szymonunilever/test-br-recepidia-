import { UnileverLibraryComponent } from '../common/globalModels';
import { RecipeCardFavoriteCallback } from '../RecipeListing/partials/models';
import { RecipeItem } from '../RecipeListing/partials/index';
import { ItemProps } from '../PageListing/partials/models';

export interface CreateElement {
  (itemData: any): JSX.Element;
}

export interface CarouselProps {
  list: any;
  createElementFunction: CreateElement;
  shownItems?: number;
  showThumbnails?: boolean;
}

export interface PageListingCarouselProps
  extends UnileverLibraryComponent<AppContent.PageListingContent> {
  list: ItemProps[];
  showThumbnails?: boolean;
}

export interface RecipeListingCarouselProps
  extends UnileverLibraryComponent<AppContent.RecipeListing.Content> {
  withFavorite?: boolean;
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  onFavoriteChange: RecipeCardFavoriteCallback;
  list: RecipeItem[];
  showThumbnails?: boolean;
}
