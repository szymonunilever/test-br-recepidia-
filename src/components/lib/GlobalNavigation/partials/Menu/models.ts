import { MenuItem } from '../../models';

export interface MenuProps {
  isAccordion?: boolean;
  dropDownIcon: JSX.Element;
  list: MenuItem[];
  isOpened?: boolean;
  className: string;
}

export interface MenuStateProps {
  openedItems: number[];
}
