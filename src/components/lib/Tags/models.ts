export enum TagViewType {
  standart,
  filter,
}
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
  viewType?: TagViewType;
}

export interface TagProps {
  tag: ItemProps;
  isEditable: boolean;
  handleClick: (tagName: string) => void;
  isToggle?: boolean;
}

export interface ItemProps {
  tagName: string;
  path: string;
}

export interface LoadMoreButton {
  label?: string;
}
