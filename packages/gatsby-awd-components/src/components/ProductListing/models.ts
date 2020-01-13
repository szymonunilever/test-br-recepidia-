import {
  titleLevel, UnileverLibraryComponent,
} from '../../models';

export interface ProductListingProps
  extends UnileverLibraryComponent<AppContent.ProductListingContent> {
  list: Internal.Product[];
  initialCount?: number;
  galleryItemsPerLoad?: number;
  titleLevel?: titleLevel;
  allCount: number;
  onLoadMore: (articlePerLoad: number) => void;
  brandLogoLink?: string;
}
