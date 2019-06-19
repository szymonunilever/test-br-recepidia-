import React from 'react';
import { Link } from 'gatsby';
import { SearchResultsProps } from './models';

const SearchResults = ({ list, hasSearchQuery }: SearchResultsProps) => {
  const noResultsMessage = hasSearchQuery ? (
    <p className="search-input__message">no results</p>
  ) : null;

  return list.length ? (
    <ul className="search-input__list">
      {list.map((item, index) => {
        if (index < 8) {
          return (
            <li key={index} className="search-input__item">
              <Link className="search-input__link" to={`/search?q=${item}`}>
                {item}
              </Link>
            </li>
          );
        }
      })}
    </ul>
  ) : (
    noResultsMessage
  );
};

export default SearchResults;
