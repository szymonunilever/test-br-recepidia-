import { ReactNode } from 'react';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  IconSelected?: any;
  content?: ButtonContent;
  isDisabled?: boolean;
  isSelected?: boolean;
  onClick?: ButtonCallback;
  toggleExternalManage?: boolean;
  children?: ReactNode | ReactNode[];
  viewType?: ButtonViewType;
  hidden?: boolean;
  isToggle?: boolean;
  type?: 'button' | 'submit' | 'reset';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes?: Record<string, any>;
}
