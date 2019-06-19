import { ItemProps } from './partials/models';
import { UnileverLibraryComponent } from '../common/globalModels';

export interface PageListingProps
  extends UnileverLibraryComponent<AppContent.PageListingContent> {
  list: ItemProps[];
  className?: string;
  viewType: string;
  initialCount: number;
  pagesPerLoad?: number;
  showThumbnails?: boolean;
}
