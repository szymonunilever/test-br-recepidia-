export interface LanguageEntry {
  value: string;
  label: string;
  path: string;
}

export interface CountrySelectorProps {
  selected?: LanguageEntry;
  list: LanguageEntry[];
  className?: string;
  flagSize?: FlagIconSize;
}

export type FlagIconSize = 'lg' | '2x' | '3x' | '4x' | '5x';
