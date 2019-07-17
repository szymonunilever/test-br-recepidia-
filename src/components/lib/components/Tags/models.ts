import { titleLevel, UnileverLibraryComponent } from '../common/globalModels';

export enum TagViewType {
  standard,
  filter,
}
export interface TagsProps
  extends UnileverLibraryComponent<AppContent.TagsContent> {
  list: Internal.Tag[];
  variant: 'toggle' | 'link' | 'removable';
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
}
export interface TagToggleHandler {
  tag: Internal.Tag;
  state: boolean;
}
export interface TagProps {
  tag: Internal.Tag;
  variant: 'toggle' | 'link' | 'removable';
  RemoveIcon?: JSX.Element;
  isToggle?: boolean;
  active?: boolean;
  enableExternalManage?: boolean;
  handleClick: (tag: Internal.Tag) => void;
  handleToggle?: (val: TagToggleHandler) => void;
}
