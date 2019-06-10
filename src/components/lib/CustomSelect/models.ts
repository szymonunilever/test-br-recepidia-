interface Option {
  value: string;
  label: string;
}
export interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeHandler?: (val: any) => void;
}
