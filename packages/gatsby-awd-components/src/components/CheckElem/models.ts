export enum checkElemTypes {
  radio,
  checkbox,
}
export interface CheckElemProps {
  type: checkElemTypes;
  label?: string;
  name?: string;
  className?: string;
  isChecked?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input?: any;
  value: string;
}
