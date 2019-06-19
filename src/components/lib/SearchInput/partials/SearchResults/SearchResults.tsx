import React from 'react';
import { Link } from 'gatsby';
import { SearchResultsProps } from './models';

const SearchResults = ({ list, hasSearchQuery, count }: SearchResultsProps) => {
  const noResultsMessage = hasSearchQuery ? (
    <p className="search-input__message">no results</p>
  ) : null;
  const slicedList = list.slice(0, count);

  return slicedList.length ? (
    <ul className="search-input__list">
      {slicedList.map((item, index) => {
        return (
          <li key={index} className="search-input__item">
            <Link className="search-input__link" to={`/search?q=${item}`}>
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
