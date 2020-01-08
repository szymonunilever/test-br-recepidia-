import {
  titleLevel,
  UnileverLibraryComponent,
} from '../../models';

export interface MediaGalleryProps
  extends UnileverLibraryComponent<AppContent.MediaGalleryContent> {
  list: Internal.Article[];
  initialCount?: number;
  galleryItemsPerLoad?: number;
  titleLevel?: titleLevel;
  allCount: number;
  onLoadMore: (articlePerLoad: number) => void;
  viewType?: MediaGalleryViewType;
  brandLogoLink?: string;
}

export enum MediaGalleryViewType {
  FourRowed,
  TwoRowed,
}
