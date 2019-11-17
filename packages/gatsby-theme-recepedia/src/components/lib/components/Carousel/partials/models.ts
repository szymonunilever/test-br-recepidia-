export interface OnArrowClick {
  (): void;
}

export interface ArrowProps {
  direction: string;
  clickFunction?: OnArrowClick;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}

export interface ProgressBarProps {
  percentage: number;
}
