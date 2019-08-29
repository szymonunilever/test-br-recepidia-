import { ReactNode } from 'react';

export interface TabProps {
  className?: string;
  view: string;
  active?: boolean;
  children?: ReactNode | ReactNode[];
  attributes?: Record<string, any>;
  visible?: boolean;
}
