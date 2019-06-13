import { LogoProps } from './partials/Logo/models';

export interface GlobalNavigationProps {
  list: MenuItem[];
  logo: LogoProps;
  dropDownIcon: JSX.Element;
  buttonCloseIcon: JSX.Element;
  searchBar?: JSX.Element;
  login?: JSX.Element;
  className?: string;
  content: LogoContent;
}

export interface MenuItem {
  name: string;
  path?: string;
  children?: MenuItem[];
}

export interface LogoContent {
  logo: {
    text: string;
  };
}
