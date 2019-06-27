import { ItemProps } from './partials/models';
import { UnileverLibraryComponent } from '../common/globalModels';
import { CarouselConfig } from '../common/Carousel/models';

export interface PageListingProps
  extends UnileverLibraryComponent<AppContent.PageListingContent> {
  list: ItemProps[];
  className?: string;
  viewType: string;
  initialCount: number;
  pagesPerLoad?: number;
  carouselConfig?: CarouselConfig;
}

export interface PageListingCarouselProps
  extends UnileverLibraryComponent<AppContent.PageListingContent> {
  list: ItemProps[];
  showThumbnails?: boolean;
  config: CarouselConfig;
}
