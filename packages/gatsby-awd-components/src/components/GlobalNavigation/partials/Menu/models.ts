export interface MenuProps {
  isAccordion?: boolean;
  dropDownIcon: JSX.Element;
  list: AppContent.GlobalNavigation.MenuItem[];
  isOpened?: boolean;
  closeMenu?: (menuIndex: number, isRoot?: boolean) => void;
  className: string;
}

export interface MenuStateProps {
  openedItems: number[];
}
