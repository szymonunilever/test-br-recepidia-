import React, {
  useState,
  SyntheticEvent,
  KeyboardEvent,
  useEffect,
} from 'react';
import SearchResults from './partials/SearchResults';
import cx from 'classnames';
import { SearchInputProps, FilterData } from './models';

const SearchInput = ({
  list = [],
  content: { title, placeholderText },
  className,
  labelIcon,
  buttonResetIcon,
  buttonSubmitIcon,
  searchResultsCount,
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
      getSearchResults(searchInputValue, {
        from: 0,
        size: searchResultsCount,
      })
        .then(() => {
          setIsLoading(false);
          setInputIsDirty(true);
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

    if (inputValue.length > 2) {
      if (onSubmit) {
        onSubmit(inputValue, {
          from: 0,
          size: searchResultsCount,
        });
      }
    }

    setInputIsDirty(false);
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitHandler(e);
    } else if (e.key === 'ArrowDown') {
      setInputValue(data[activeItemIndex]);
      setActiveItemIndex(
        activeItemIndex < data.length - 1 ? activeItemIndex + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      setInputValue(data[activeItemIndex]);
      setActiveItemIndex(
        activeItemIndex <= 0 ? data.length - 1 : activeItemIndex - 1
      );
    }
  };

  const onClickSearchResultsItemHandler = (index: number) => {
    setInputValue(data[index]);

    if (onClickSearchResultsItem) {
      setInputIsDirty(false);
      onClickSearchResultsItem(data[index], { size: searchResultsCount });
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);

    if (value.length >= minLength) {
      clearTimeOut();
      setInputIsDirty(false);
      setTimerId(() =>
        window.setTimeout(() => {
          getResults(value);
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
        />
      ) : null}
    </div>
  );
};

export default SearchInput;
