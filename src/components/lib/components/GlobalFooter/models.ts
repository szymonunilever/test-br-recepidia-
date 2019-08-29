import { UnileverLibraryComponent } from '../globalModels';
import * as React from 'react';

export interface GlobalFooterProps
  extends UnileverLibraryComponent<AppContent.GlobalFooter.Content> {
  children?: React.ReactNode;
  logoIcon?: React.ReactNode | null;
}
