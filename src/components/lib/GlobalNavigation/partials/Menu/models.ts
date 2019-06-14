export interface MenuProps {
  isAccordion?: boolean;
  dropDownIcon: JSX.Element;
  list: AppContent.GlobalNavigation.MenuItem[];
  isOpened?: boolean;
  className: string;
}

export interface MenuStateProps {
  openedItems: number[];
}
