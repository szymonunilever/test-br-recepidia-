export enum checkelemTypes {
  radio,
  checkbox,
}
export interface CheckelemProps {
  type: checkelemTypes;
  labelText?: string;
  name: string;
  className?: string;
  isChecked?: boolean;
}
