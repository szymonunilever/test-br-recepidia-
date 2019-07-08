export interface LanguageEntry {
  value: string;
  label: string;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}

export interface CountrySelectorProps {
  selected?: LanguageEntry;
  list: LanguageEntry[];
  className?: string;
}
