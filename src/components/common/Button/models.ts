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
  onChange?: ButtonCallback;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  viewType?: ButtonViewType;
  isToggle?: boolean;
}
