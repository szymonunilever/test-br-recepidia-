import React, {
  useState,
  SyntheticEvent,
  KeyboardEvent,
  useEffect,
} from 'react';
import SearchResults from './partials/SearchResults';
import cx from 'classnames';
import { SearchInputProps, FilterData } from './models';
import { trim } from 'lodash';

const SearchInput = ({
  list = [],
  content: { title, placeholderText },
  className,
  labelIcon,
  buttonResetIcon,
  buttonSubmitIcon,
  searchResultsCount = 8,
  debounceTimeout = 300,
  onSubmit,
  getSearchResults,
  searchResults,
  defaultSearchValue = '',
  onClickSearchResultsItem,
  autoFocus = false,
  minLength = 3,
}: SearchInputProps) => {
  const classNames = cx('search-input', className);
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [timerId, setTimerId] = useState();
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [inputIsDirty, setInputIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInputValue(defaultSearchValue);
  }, [defaultSearchValue]);

  const filterData: FilterData = (data, val) => {
    return val
      ? data
          .filter(
            (text: string) =>
              text && text.toLowerCase().includes(val.toLowerCase())
          )
          .slice(0, searchResultsCount)
      : [];
  };

  const getResults = (searchInputValue: string) => {
    if (getSearchResults) {
      setIsLoading(true);
      getSearchResults(trim(searchInputValue), {
        from: 0,
        size: searchResultsCount,
      })
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    } else {
      setData(filterData(list, searchInputValue));
      setInputIsDirty(true);
    }
  };

  useEffect(() => {
    if (searchResults) {
      setData(searchResults);
    }
  }, [searchResults]);

  const clearTimeOut = () => window.clearTimeout(timerId);

  const resetForm = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    clearTimeOut();
    setInputValue('');
    setData([]);
    setActiveItemIndex(0);
  };

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    setData([]);
    setIsLoading(false);
    setInputIsDirty(false);

    if (trim(inputValue).length >= minLength && onSubmit) {
      onSubmit(inputValue, {
        from: 0,
        size: searchResultsCount,
      });
    }
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitHandler(e);
    } else if (e.key === 'ArrowDown') {
      let newActiveItemIndex =
        activeItemIndex < data.length - 1 ? activeItemIndex + 1 : 0;
      setInputValue(data[newActiveItemIndex]);
      setActiveItemIndex(newActiveItemIndex);
    } else if (e.key === 'ArrowUp') {
      let newActiveItemIndex =
        activeItemIndex <= 0 ? data.length - 1 : activeItemIndex - 1;
      setInputValue(data[newActiveItemIndex]);
      setActiveItemIndex(newActiveItemIndex);
    }
  };

  const onHoverSearchResultsItemHandler = (index: number) => {
    setInputValue(data[index]);
    setActiveItemIndex(index);
  };

  const onClickSearchResultsItemHandler = (index: number) => {
    setInputValue(data[index]);
    setInputIsDirty(false);

    if (onClickSearchResultsItem) {
      setData([]);
      onClickSearchResultsItem(data[index], { size: searchResultsCount });
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const trimmedValue = trim(value);

    setInputValue(value);
    setInputIsDirty(true);
    setData([]);

    if (trimmedValue.length >= minLength && trimmedValue !== trim(inputValue)) {
      clearTimeOut();
      setTimerId(() =>
        window.setTimeout(() => {
          getResults(trimmedValue);
        }, debounceTimeout)
      );
    }
  };

  const inputHasValidValue = !!(inputValue.length >= minLength);
  const buttonReset = inputValue.length ? (
    <button
      className="form__button-reset"
      type="button"
      onClick={resetForm}
      aria-label="reset"
    >
      {buttonResetIcon}
    </button>
  ) : null;

  return (
    <div className={classNames} data-componentname="search-input">
      <h1 className="search-input__title">{title}</h1>

      <form className="form">
        <div className="form__group">
          <label className="form__label" htmlFor="search-input">
            <span className="form__label-text">search</span>
            {labelIcon}
          </label>
          <input
            autoFocus={autoFocus}
            className="form__input"
            type="text"
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
            value={inputValue}
            id="search-input"
            placeholder={placeholderText}
            autoComplete="off"
          />
          {buttonReset}
          <button
            className="form__button-submit"
            onClick={submitHandler}
            aria-label="submit"
            disabled={!inputHasValidValue}
          >
            {buttonSubmitIcon}
          </button>
        </div>
      </form>

      {inputIsDirty && inputHasValidValue && !isLoading ? (
        <SearchResults
          navigateToItem={!!onClickSearchResultsItem}
          onClickHandler={onClickSearchResultsItemHandler}
          activeIndex={activeItemIndex}
          list={data}
          onHoverHandler={onHoverSearchResultsItemHandler}
        />
      ) : null}
    </div>
  );
};

export default SearchInput;
