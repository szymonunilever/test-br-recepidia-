import { Tag } from '../RecipeListing/partials';

export enum TagViewType {
  standard,
  filter,
}
export interface TagsProps {
  list: ItemProps[];
  content?: {
    title?: string;
    cta?: LoadMoreButton;
  };
  isEditable: boolean;
  tagsPerLoad?: number;
  selectedTags?: ItemProps[];
  initialCount?: number | 'all';
  className?: string;
  viewType?: TagViewType;
  handleTagToggle?: (val: TagToggleHandler) => void;
  handleTagRemove?: (val: Tag) => void;
}
export interface TagToggleHandler {
  tag: ItemProps;
  state: boolean;
}
export interface TagProps {
  tag: ItemProps;
  isEditable: boolean;
  isToggle?: boolean;
  active?: boolean;
  handleClick: (tag: Tag) => void;
  handleToggle?: (val: TagToggleHandler) => void;
}

export interface ItemProps extends Tag {
  path?: string;
}

export interface LoadMoreButton {
  label?: string;
}
