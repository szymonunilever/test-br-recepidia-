import { UnileverLibraryComponent } from '../globalModels';

export interface AccordionProps extends UnileverLibraryComponent {
  title?: string;
  children: any;
  isOpen?: boolean;
  icon?: JSX.Element;
  iconOpened?: JSX.Element;
}
