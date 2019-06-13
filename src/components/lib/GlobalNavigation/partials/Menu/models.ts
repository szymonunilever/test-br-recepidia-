import { MenuItem } from '../../models';

export interface MenuProps {
  menuAccordionBehavior?: boolean;
  dropDownIcon: JSX.Element;
  list: MenuItem[];
  isOpened?: boolean;
  className: string;
}

export interface MenuStateProps {
  openedItems: number[];
}
