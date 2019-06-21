export interface AccordionProps {
  className?: string;
  title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  isOpen?: boolean;
  icon?: JSX.Element;
  iconOpened?: JSX.Element;
}
