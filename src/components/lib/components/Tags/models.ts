import {
  titleLevel,
  UnileverLibraryComponent,
} from '../../models/globalModels';

export enum TagViewType {
  standard,
  filter,
}
export interface TagsProps
  extends UnileverLibraryComponent<AppContent.TagsContent> {
  list: Internal.Tag[];
  variant?: TagVariant;
  RemoveIcon?: JSX.Element;
  tagsPerLoad?: number;
  enableExternalManage?: boolean;
  selectedTags?: Internal.Tag[];
  initialCount?: number | 'all';
  className?: string;
  viewType?: TagViewType;
  handleTagToggle?: (val: TagToggleHandler) => void;
  handleTagRemove?: (val: Internal.Tag) => void;
  titleLevel?: titleLevel;
  displayOnlyUniqueNames?: boolean;
}

export enum TagVariant {
  toggle,
  link,
  removable,
}
export interface TagToggleHandler {
  tag: Internal.Tag;
  state: boolean;
}
export interface TagProps {
  tag: Internal.Tag;
  variant: TagVariant;
  RemoveIcon?: JSX.Element;
  isToggle?: boolean;
  active?: boolean;
  enableExternalManage?: boolean;
  handleClick: (tag: Internal.Tag) => void;
  handleToggle?: (val: TagToggleHandler) => void;
}
