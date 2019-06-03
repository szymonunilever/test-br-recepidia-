export interface FavoriteCallback {
  (selected: boolean): void;
}

export interface FavoriteProps {
  icon: JSX.Element;
  iconSelected?: JSX.Element;
  isSelected: boolean;
  onChange?: FavoriteCallback;
  className?: string;
}
