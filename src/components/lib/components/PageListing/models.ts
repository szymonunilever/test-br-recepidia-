import { ItemProps } from './partials/PageListingItem/models';
import { UnileverLibraryComponent } from '../common/globalModels';
import { CarouselConfig } from '../common/Carousel/models';

export enum PageListingViewTypes {
  default,
  carousel,
}

export interface PageListingProps
  extends UnileverLibraryComponent<AppContent.PageListingContent> {
  list: ItemProps[];
  className?: string;
  viewType?: PageListingViewTypes;
  initialCount?: number;
  pagesPerLoad?: number;
  carouselConfig?: CarouselConfig;
}

export interface PageListingCarouselProps
  extends UnileverLibraryComponent<AppContent.PageListingContent> {
  list: ItemProps[];
  showThumbnails?: boolean;
  config: CarouselConfig;
}
