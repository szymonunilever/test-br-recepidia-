export interface OnArrowClick {
  (): void;
}

export interface ArrowProps {
  direction: string;
  clickFunction?: OnArrowClick;
  icon: any;
}

export interface ProgressBarProps {
  percentage: number;
}
