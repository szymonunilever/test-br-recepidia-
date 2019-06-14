export interface NavigationProps {
  isAccordion?: boolean;
  dropDownIcon: JSX.Element;
  buttonCloseIcon: JSX.Element;
  handleToggleNavigationClick: () => void;
  login?: JSX.Element;
  list: AppContent.MenuItemContent[];
  isActive: boolean;
}
