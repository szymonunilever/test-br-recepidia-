export enum checkElemTypes {
  radio,
  checkbox,
}
export interface CheckElemProps {
  type: checkElemTypes;
  label?: string;
  name: string;
  className?: string;
  isChecked?: boolean;
}
