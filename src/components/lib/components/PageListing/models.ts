import { ItemProps } from './partials/PageListingItem/models';
import { titleLevel, UnileverLibraryComponent } from '../globalModels';
import { CarouselConfig } from '../Carousel/models';

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
  titleLevel?: titleLevel;
  imageSizes?: string;
}

export interface PageListingCarouselProps
  extends UnileverLibraryComponent<AppContent.PageListingContent> {
  list: ItemProps[];
  showThumbnails?: boolean;
  config: CarouselConfig;
  imageSizes?: string;
}
