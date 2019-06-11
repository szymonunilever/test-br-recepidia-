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
  cta: LoadMoreButton;
  loadMore: (e: ButtonEvent) => void;
}

export interface LoadMoreButton {
  label?: string;
}

interface Image {
  alt: string;
}

type ButtonEvent = React.MouseEvent<HTMLButtonElement>;
