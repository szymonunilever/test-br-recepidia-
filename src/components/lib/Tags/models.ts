export interface TagsProps {
  list: ItemProps[];
  content: {
    title?: string;
    cta: LoadMoreButton;
  };
  isEditable: boolean;
  tagsPerLoad?: number;
  initialCount: number;
  className?: string;
}

export interface TagProps {
  tag: ItemProps;
  isEditable: boolean;
  handleClick: (tagName: string) => void;
}

export interface ItemProps {
  tagName: string;
  path: string;
}

export interface LoadMoreButton {
  label?: string;
}
