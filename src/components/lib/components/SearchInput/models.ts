import { UnileverLibraryComponent } from '../common/globalModels';
import { getSearchData } from 'src/staticPages/Search/models';

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
  onClickSearchResultsItem?: getSearchData;
  autoFocus?: boolean;
  searchResults?: string[];
}

export interface FilterData {
  (data: string[], val: string): string[];
}
