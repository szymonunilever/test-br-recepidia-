import { LanguageEntry } from '../CountrySelector/index';

export interface Option {
  value: string;
  label: string;
}
export interface SelectProps {
  options: Option[] | LanguageEntry[];
  placeholder?: string;
  className?: string;
  isSearchable?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeHandler?: (val: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatOptionLabel?: any;
}
