export interface CreateElement {
  (itemData: any): JSX.Element;
}

export interface CarouselProps {
  list: any;
  createElementFunction: CreateElement;
  shownItems?: number;
  showThumbnails?: boolean;
}
