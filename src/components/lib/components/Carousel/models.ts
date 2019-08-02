export interface CreateElement {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (itemData: any): JSX.Element;
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
  arrowIcon?: JSX.Element;
}

export interface CarouselProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any;
  createElementFunction: CreateElement;
  config: CarouselConfig;
}
