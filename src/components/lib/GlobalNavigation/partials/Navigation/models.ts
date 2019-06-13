import { MenuItem } from '../../models';

export interface NavigationProps {
  dropDownIcon: JSX.Element;
  buttonCloseIcon: JSX.Element;
  handleToggleNavigationClick: () => void;
  login?: JSX.Element;
  list: MenuItem[];
  isActive: boolean;
}
