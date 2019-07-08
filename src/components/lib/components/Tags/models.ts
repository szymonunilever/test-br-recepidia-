import { UnileverLibraryComponent } from '../common/globalModels';

export enum TagViewType {
  standard,
  filter,
}
export interface TagsProps
  extends UnileverLibraryComponent<AppContent.TagsContent> {
  list: ItemProps[];
  variant: 'toggle' | 'link' | 'removable';
  RemoveIcon?: JSX.Element;
  tagsPerLoad?: number;
  enableExternalManage?: boolean;
  selectedTags?: ItemProps[];
  initialCount?: number | 'all';
  className?: string;
  viewType?: TagViewType;
  handleTagToggle?: (val: TagToggleHandler) => void;
  handleTagRemove?: (val: ItemProps) => void;
}
export interface TagToggleHandler {
  tag: ItemProps;
  state: boolean;
}
export interface TagProps {
  tag: ItemProps;
  variant: 'toggle' | 'link' | 'removable';
  RemoveIcon?: JSX.Element;
  isToggle?: boolean;
  active?: boolean;
  enableExternalManage?: boolean;
  handleClick: (tag: ItemProps) => void;
  handleToggle?: (val: TagToggleHandler) => void;
}

export interface ItemProps {
  id: number | string;
  name: string;
  path?: string;
}
