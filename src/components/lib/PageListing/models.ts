import { ItemProps, LoadMoreButton } from './partials/models';

export interface PageListingProps {
  list: ItemProps[];
  content: {
    title: string;
    subtitle?: string;
    cta?: LoadMoreButton;
  };
  className?: string;
  viewType: string;
  initialCount: number;
  pagesPerLoad?: number;
}
