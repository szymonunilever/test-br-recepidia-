export interface PageProps {
  page: ItemProps;
  className: string;
}

export interface ItemProps {
  title: string;
  link: string;
  image: Image;
}

export interface LoadMoreButtonProps {
  loadMoreButton: LoadMoreButton;
  loadMore: (e: ButtonEvent) => void;
  className: string;
}

export interface LoadMoreButton {
  text?: string;
  pagesPerLoad?: number;
  isEnabled: boolean;
}

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

interface Image {
  link: string;
  alt: string;
}
