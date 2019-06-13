import { MenuItem } from '../../models';

export interface NavigationProps {
  menuAccordionBehavior?: boolean;
  dropDownIcon: JSX.Element;
  buttonCloseIcon: JSX.Element;
  handleToggleNavigationClick: () => void;
  login?: JSX.Element;
  list: MenuItem[];
  isActive: boolean;
}
