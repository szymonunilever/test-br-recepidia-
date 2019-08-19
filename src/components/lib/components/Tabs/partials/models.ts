import { ReactNode } from 'react';

export interface TabProps {
  className?: string;
  view: string;
  active?: boolean;
  children?: ReactNode | ReactNode[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes?: Record<string, any>;
}
