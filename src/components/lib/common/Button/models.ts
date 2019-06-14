import { UnileverLibraryComponent } from '../globalModels';

export interface ButtonCallback {
  (selected: boolean): void;
}
export enum ButtonViewType {
  classic,
  icon,
}

export interface ButtonContent {
  label?: string;
}

export interface ButtonProps {
  className?: string;
  icon?: JSX.Element;
  iconSelected?: JSX.Element;
  content?: ButtonContent;
  isSelected?: boolean;
  onClick?: ButtonCallback;
  toggleExternalManage?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  viewType?: ButtonViewType;
  hidden?: boolean;
  isToggle?: boolean;
}
