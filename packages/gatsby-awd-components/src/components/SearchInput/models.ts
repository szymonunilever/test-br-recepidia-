import { getSearchData } from '../SearchListing';
import { UnileverLibraryComponent } from '../../models';

export interface SearchInputProps
  extends UnileverLibraryComponent<AppContent.SearchInput.Content> {
  list?: string[];
  labelIcon: JSX.Element;
  buttonResetIcon: JSX.Element;
  buttonSubmitIcon?: JSX.Element;
  searchResultsCount?: number;
  debounceTimeout?: number;
  defaultSearchValue?: string;
  onSubmit: getSearchData | Function;
  getSearchResults?: getSearchData;
  onClickSearchResultsItem?: getSearchData | Function;
  autoFocus?: boolean;
  redirectOnSubmit?: boolean;
  searchResults?: string[];
  minLength?: number;
  maxLength?: number;
}

export interface FilterData {
  (data: string[], val: string): string[];
}
