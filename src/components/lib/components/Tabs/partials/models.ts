import { ReactNode } from 'react';

export interface TabProps {
  className?: string;
  view: string;
  active?: boolean;
  children?: ReactNode | ReactNode[];
}
