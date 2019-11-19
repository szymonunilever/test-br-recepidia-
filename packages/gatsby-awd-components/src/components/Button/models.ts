import { ReactNode } from 'react';
import { Icon } from '../../models';

export interface ButtonCallback {
  (selected: boolean): void;
}
export enum ButtonViewType {
  classic,
  icon,
}

export interface ButtonProps {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: Icon;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  IconSelected?: Icon;
  content?: AppContent.CTAContent;
  role?: string;
  isDisabled?: boolean;
  isSelected?: boolean;
  onClick?: ButtonCallback;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  children?: ReactNode | ReactNode[];
  viewType?: ButtonViewType;
  hidden?: boolean;
  isToggle?: boolean;
  type?: 'button' | 'submit' | 'reset';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes?: Record<string, any>;
}
