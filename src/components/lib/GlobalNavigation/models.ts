import { LogoProps } from './partials/Logo/models';

export interface GlobalNavigationProps {
  logo: LogoProps;
  dropDownIcon: JSX.Element;
  buttonCloseIcon: JSX.Element;
  searchBar?: JSX.Element;
  login?: JSX.Element;
  children?: React.ReactNode;
  menuAccordionBehavior?: boolean;
  className?: string;
  content: GlobalNavigationContent;
}

export interface MenuItem {
  name: string;
  path?: string;
  children?: MenuItem[];
}

export interface GlobalNavigationContent {
  list: MenuItem[];
}
