import { ItemProps, LoadMoreButton } from './partials/models';

export interface PageListingProps {
  data: {
    loadMoreButton: LoadMoreButton;
    customClass?: string;
    componentName: string;
    title: string;
    subtitle?: string;
    viewType: string;
    pagesCount: number;
    pages: ItemProps[];
  };
}
