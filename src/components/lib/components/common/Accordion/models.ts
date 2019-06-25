import { ReactNode } from 'react';

export interface AccordionProps {
  className?: string;
  title?: string;
  children: ReactNode | ReactNode[];
  isOpen?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  IconOpened?: any;
}
