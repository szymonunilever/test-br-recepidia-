export interface MenuProps {
  isAccordion?: boolean;
  dropDownIcon: JSX.Element;
  list: AppContent.MenuItemContent[];
  isOpened?: boolean;
  className: string;
}

export interface MenuStateProps {
  openedItems: number[];
}
