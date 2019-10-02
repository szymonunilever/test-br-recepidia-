import { ReactChild, ReactChildren } from 'react';
import { UnileverLibraryComponent } from '../../../globalModels';

export interface ResultSectionProps
  extends UnileverLibraryComponent<AppContent.WizardResultsSection.Content> {
  containerClass?: string;
  stepId?: string;
  resultSize: number;
  children?: ReactChild | ReactChildren | null;
  isLoading?: boolean;
}
