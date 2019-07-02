import React from 'react';
import { Link } from 'gatsby';
import { SearchResultsProps } from './models';
import cx from 'classnames';

const SearchResults = ({
  list,
  hasSearchQuery,
  activeIndex,
}: SearchResultsProps) => {
  const noResultsMessage = hasSearchQuery ? (
    <p className="search-input__message">no results</p>
  ) : null;

  return list.length ? (
    <ul className="search-input__list">
      {list.map((item, index) => {
        const classNames = cx('search-input__link', {
          active: activeIndex === index,
        });

        return (
          <li key={index} className="search-input__item">
            <Link className={classNames} to={`/search?q=${item}`}>
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  ) : (
    noResultsMessage
  );
};

export default SearchResults;
