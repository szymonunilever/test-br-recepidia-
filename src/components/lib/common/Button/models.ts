export interface ButtonCallback {
  (selected: boolean): void;
}
export enum ButtonViewType {
  classic,
  icon,
}

export interface ButtonProps {
  icon?: JSX.Element;
  iconSelected?: JSX.Element;
  isSelected?: boolean;
  onClick?: ButtonCallback;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  viewType?: ButtonViewType;
  hidden?: boolean;
  isToggle?: boolean;
  label?: string;
  className?: string;
}
