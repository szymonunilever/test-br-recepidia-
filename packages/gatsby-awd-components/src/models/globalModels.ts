import { ReactNode } from 'react';

export interface UnileverLibraryComponent<T> {
  className?: string;
  content: T;
}

export interface WizardStepComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionCallback: (val: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stepResultsCallback?: (val: any) => void;
  stepId: string;
  containerClass: string;
}

export type titleLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type Icon = ReactNode | Function;
