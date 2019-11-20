import { ReactChild, ReactElement } from 'react';
import { Icon } from '../../models';
import { RecipeCardProps } from '../RecipeListing/partials/models';

export interface CreateElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (itemData: any): ReactElement<RecipeCardProps> | undefined;
}

export interface BreakpointProps {
  width: number;
  switchElementsBelowBreakpoint: number;
  switchElementsAfterBreakpoint: number;
  visibleElementsBelowBreakpoint: number;
  visibleElementsAboveBreakpoint: number;
}

export interface CarouselConfig {
  breakpoints?: BreakpointProps[];
  arrowIcon?: Icon;
}

export interface CarouselProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any;
  createElementFunction: CreateElement;
  config: CarouselConfig;
  onVisibleElementsChanged?: Function;
}
