export enum TagViewType {
  standard,
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
  handleToggle?: (val: TagToggleHandler) => void;
}
export interface TagToggleHandler {
  tagName: string;
  state: boolean;
}
export interface TagProps {
  tag: ItemProps;
  isEditable: boolean;
  isToggle?: boolean;
  handleClick: (tagName: string) => void;
  handleToggle?: (val: TagToggleHandler) => void;
}

export interface ItemProps {
  tagName: string;
  path: string;
}

export interface LoadMoreButton {
  label?: string;
}
