import { UnileverLibraryComponent } from '../common/globalModels';

export interface TabsProps
  extends UnileverLibraryComponent<AppContent.TabsContent> {
  children: JSX.Element[];
}
