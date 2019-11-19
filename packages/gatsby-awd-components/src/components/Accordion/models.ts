import { ReactNode } from 'react';

export interface AccordionProps {
  className?: string;
  title?: AccordionTitle;
  children: ReactNode | ReactNode[];
  isOpen?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  IconOpened?: any;
}

export interface AccordionTitle {
  label?: string;
  name?: string;
}
