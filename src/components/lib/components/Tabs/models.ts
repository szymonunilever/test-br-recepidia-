import { ReactComponentElement } from 'react';
import { UnileverLibraryComponent } from '../common/globalModels';
import { Tab } from './partials';

export interface TabsProps
  extends UnileverLibraryComponent<AppContent.Tabs.Content> {
  children: ReactComponentElement<typeof Tab>[];
}
