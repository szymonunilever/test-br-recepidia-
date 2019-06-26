import { UnileverLibraryComponent } from '../common/globalModels';

export interface GlobalFooterProps
  extends UnileverLibraryComponent<AppContent.GlobalFooter.Content> {
  children?: React.ReactNode;
  logoIcon?: JSX.Element;
}
