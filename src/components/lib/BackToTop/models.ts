import { ButtonViewType } from '../common/Button';
import { UnileverLibraryComponent } from '../common/globalModels';

export interface BackToTopProps extends UnileverLibraryComponent {
  icon?: JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  viewType?: ButtonViewType;
  hideTopPositionPx?: number;
}

export interface CustomEventTarget {
  scrollingElement: HTMLElement | null;
}
