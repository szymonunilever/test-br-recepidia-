interface Option {
  value: string;
  label: string;
}
export interface SelectProps {
  options: Option[];
  placeholder?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeHandler?: (val: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input?: any;
}
