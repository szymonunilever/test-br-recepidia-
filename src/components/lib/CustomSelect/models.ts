interface Option {
  value: string;
  label: string;
}
export interface CustomSelectProps {
  // type: checkelemTypes;
  options: Array<Option>;
  placeholder?: string;
  className?: string;
  changeHandler?: (val: any) => void;
}
