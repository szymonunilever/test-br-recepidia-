export interface CreateElement {
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
  breakpoints: BreakpointProps[];
}

export interface CarouselProps {
  list: any;
  createElementFunction: CreateElement;
  config: CarouselConfig;
}
