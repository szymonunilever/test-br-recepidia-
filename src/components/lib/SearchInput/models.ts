import { UnileverLibraryComponent } from '../common/globalModels';

export interface SearchInputProps
  extends UnileverLibraryComponent<AppContent.SearchInput.Content> {
  list?: string[];
  searchUrl?: string;
  labelIcon: JSX.Element;
  buttonResetIcon: JSX.Element;
  buttonSubmitIcon: JSX.Element;
  searchResultsCount?: number;
  debounceTimeout?: number;
  onSubmit: (inputValue: string) => void;
  getFilteredData?: (searchInputValue: string) => string[];
}

export interface FilterData {
  (data: string[], val: string): string[];
}
