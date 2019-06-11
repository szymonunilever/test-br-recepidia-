export interface PageProps {
  page: ItemProps;
}

export interface ItemProps {
  title: string;
  path: string;
  image: Image;
  localImage: any;
}

export interface LoadMoreButtonProps {
  loadMoreButton: LoadMoreButton;
  loadMore: (e: ButtonEvent) => void;
}

export interface LoadMoreButton {
  text?: string;
  pagesPerLoad?: number;
  isEnabled: boolean;
}

interface Image {
  alt: string;
}

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
