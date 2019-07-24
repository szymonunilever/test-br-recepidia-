import { UnileverLibraryComponent } from '../common/globalModels';
import { getSearchData } from '../SearchListing/models';

export interface SearchInputProps
  extends UnileverLibraryComponent<AppContent.SearchInput.Content> {
  list?: string[];
  searchUrl?: string;
  labelIcon: JSX.Element;
  buttonResetIcon: JSX.Element;
  buttonSubmitIcon?: JSX.Element;
  searchResultsCount?: number;
  debounceTimeout?: number;
  defaultSearchValue?: string;
  onSubmit: (inputValue: string) => void;
  getSearchData?: getSearchData;
  onClickSearchResultsItem?: (currentItemValue: string) => void;
  autoFocus?: boolean;
}

export interface FilterData {
  (data: string[], val: string): string[];
}

export interface GetSearchDataParams {
  from?: number;
  size?: number;
}
