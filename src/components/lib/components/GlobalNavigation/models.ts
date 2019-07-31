import { UnileverLibraryComponent } from '../globalModels';
import { LogoProps } from '../Logo/models';

export interface GlobalNavigationProps
  extends UnileverLibraryComponent<AppContent.GlobalNavigation.Content> {
  logo: LogoProps;
  dropDownIcon: JSX.Element;
  buttonCloseIcon: JSX.Element;
  login?: JSX.Element;
  children?: React.ReactNode;
  isAccordion?: boolean;
  className?: string;
}
