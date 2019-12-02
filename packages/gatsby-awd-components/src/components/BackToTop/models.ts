import { ReactNode } from 'react';
import { ButtonViewType } from '../Button';
import { UnileverLibraryComponent } from '../../models';

export interface BackToTopProps
  extends UnileverLibraryComponent<AppContent.BackToTopContent> {
  Icon?: JSX.Element;
  children?: ReactNode | ReactNode[];
  viewType?: ButtonViewType;
  hideTopPositionPx?: number;
}

export interface CustomEventTarget {
  scrollingElement: HTMLElement | null;
}
