import { ReactChild, ReactChildren } from 'react';
import {
  UnileverLibraryComponent,
  WizardStepComponent,
} from '../../../../models';

export interface ResultSectionProps
  extends UnileverLibraryComponent<AppContent.WizardResultsSection.Content>,
    WizardStepComponent {
  resultSize: number;
  children?: ReactChild | ReactChildren | null;
  isLoading?: boolean;
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: (val: any) => void;
  };
}
