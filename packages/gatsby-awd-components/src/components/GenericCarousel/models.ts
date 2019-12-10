import { Icon, titleLevel, UnileverLibraryComponent } from '../../models';

export interface GenericBreakpointProps {
  width: number;
  switchElementsBelowBreakpoint: number;
  switchElementsAfterBreakpoint: number;
  visibleElementsBelowBreakpoint: number;
  visibleElementsAboveBreakpoint: number;
}

export interface GenericCarouselConfig {
  breakpoints?: GenericBreakpointProps[];
  arrowIcon?: Icon;
}

export interface GenericCarouselProps extends UnileverLibraryComponent<AppContent.ListingContent>{
  config?: GenericCarouselConfig;
  onVisibleElementsChanged?: Function;
  titleLevel?: titleLevel;
}
