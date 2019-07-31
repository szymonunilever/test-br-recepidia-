import { ReactNode } from 'react';

export interface WizardProps {
  actionCallback: (data: object) => void;
  children: ReactNode;
  step?: number;
}

export interface ResultsStore {
  [key: string]: object | null;
}

export interface NextAction {
  data: ResultsStore;
}
