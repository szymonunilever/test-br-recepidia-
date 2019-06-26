export interface PageProps {
  page: ItemProps;
}

export interface ItemProps {
  title: string;
  path: string;
  image: Image;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localImage: any;
}

interface Image {
  alt: string;
}
