import { UnileverLibraryComponent } from '../common/globalModels';
import { LogoProps } from './partials/Logo/models';

export interface GlobalNavigationProps
  extends UnileverLibraryComponent<AppContent.GlobalNavigation.Content> {
  logo: LogoProps;
  dropDownIcon: JSX.Element;
  buttonCloseIcon: JSX.Element;
  searchBar?: JSX.Element;
  login?: JSX.Element;
  children?: React.ReactNode;
  isAccordion?: boolean;
  className?: string;
}
