import { MenuItem } from '../../models';

export interface MenuProps {
  dropDownIcon: JSX.Element;
  list: MenuItem[];
  isOpened?: boolean;
  className: string;
}

export interface MenuStateProps {
  openedItems: number[];
}
