import React, { useState } from 'react';
import SearchResults from './partials/SearchResults';
import { navigate } from 'gatsby';
import cx from 'classnames';
import { SearchInputProps, FilterData } from './models';

const SearchInput = ({
  list = [],
  content: { title, placeholderValue = 'type something...' },
  className,
  searchUrl,
  labelIcon,
  buttonResetIcon,
  buttonSubmitIcon,
}: SearchInputProps) => {
  const classNames = cx('search-input', className);
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState<string[]>([]);
  const [timerId, setTimerId] = useState();

  const filterData: FilterData = (data, val) =>
    val.length ? data.filter((item: string) => item.includes(val)) : [];

  const getResults = (searchInputValue: string) => {
    if (searchUrl) {
      fetch(`${searchUrl}/?q=${inputValue}/`)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => {
          throw new Error(err);
        });
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
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/search?q=${inputValue}/`);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    clearTimeOut();
    setInputValue(value);
    setTimerId(() => window.setTimeout(() => getResults(value), 300));
  };
  const inputHasValue = !!inputValue.length;

  const buttonClear = inputValue.length ? (
    <button className="form__button-reset" type="button" onClick={resetForm}>
      {buttonResetIcon}
    </button>
  ) : null;

  return (
    <div className={classNames} data-componentname="search-input">
      <h3 className="search-input__title">{title}</h3>

      <form className="form" onSubmit={submitHandler}>
        <div className="form__group">
          <label className="form__label" htmlFor="search-input">
            {labelIcon}
          </label>
          <input
            className="form__input"
            type="text"
            onChange={onChangeHandler}
            value={inputValue}
            id="search-input"
            placeholder={placeholderValue}
            autoComplete="off"
          />
          {buttonClear}
          <button
            className="form__button-submit"
            type="submit"
            disabled={!inputHasValue}
          >
            {buttonSubmitIcon}
          </button>
        </div>
      </form>

      <SearchResults hasSearchQuery={inputHasValue} list={data} />
    </div>
  );
};

export default SearchInput;
