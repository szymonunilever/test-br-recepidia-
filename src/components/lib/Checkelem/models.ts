export enum checkelemTypes {
  radio,
  checkbox,
}
export interface CheckelemProps {
  type: checkelemTypes;
  label?: string;
  name: string;
  className?: string;
  isChecked?: boolean;
}
