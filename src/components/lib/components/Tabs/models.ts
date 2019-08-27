import { ReactComponentElement } from 'react';
import { UnileverLibraryComponent } from '../globalModels';
import { Tab } from './partials';

export interface TabsProps
  extends UnileverLibraryComponent<AppContent.Tabs.Content> {
  children: ReactComponentElement<typeof Tab>[];
  tabsHeaderContent?: TabsHeaderContent;
  tabFromLocation?: boolean;
  location?: Location;
}

export interface TabsHeaderContent {
  contents: HeaderContent[];
}

export interface HeaderContent {
  heading: string;
  subheading: string;
  view: string;
  defaultSubheading?: string;
}
