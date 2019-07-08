import React, { useState, SyntheticEvent, KeyboardEvent } from 'react';
import SearchResults from './partials/SearchResults';
import cx from 'classnames';
import { SearchInputProps, FilterData } from './models';

const SearchInput = ({
  list = [],
  content: { title, placeholderText },
  className,
  searchUrl,
  labelIcon,
  buttonResetIcon,
  buttonSubmitIcon,
  searchResultsCount,
  debounceTimeout = 300,
  onSubmit,
  getFilteredData,
}: SearchInputProps) => {
  const classNames = cx('search-input', className);
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [timerId, setTimerId] = useState();
  const [activeItemIndex, setActiveItemIndex] = useState(0);

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
    if (searchUrl) {
      fetch(`${searchUrl}/?q=${inputValue}/`)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => {
          throw new Error(err);
        });
    } else if (getFilteredData) {
      setData(getFilteredData(searchInputValue));
    } else {
      setData(filterData(list, searchInputValue));
    }
  };

  const clearTimeOut = () => {
    window.clearTimeout(timerId);
  };

  const resetForm = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    clearTimeOut();
    setInputValue('');
    setData([]);
    setActiveItemIndex(0);
  };

  const submitHandler = (e: SyntheticEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(inputValue);
    }
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

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    clearTimeOut();
    setInputValue(value);
    setTimerId(() =>
      window.setTimeout(() => getResults(value), debounceTimeout)
    );
  };

  const inputHasValue = !!inputValue;

  const buttonReset = inputHasValue ? (
    <button className="form__button-reset" type="button" onClick={resetForm}>
      {buttonResetIcon}
    </button>
  ) : null;

  return (
    <div className={classNames} data-componentname="search-input">
      <h2 className="search-input__title">{title}</h2>

      <form className="form">
        <div className="form__group">
          <label className="form__label" htmlFor="search-input">
            {labelIcon}
          </label>
          <input
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
            disabled={!inputHasValue}
          >
            {buttonSubmitIcon}
          </button>
        </div>
      </form>

      <SearchResults
        activeIndex={activeItemIndex}
        hasSearchQuery={inputHasValue}
        list={data}
      />
    </div>
  );
};

export default SearchInput;
