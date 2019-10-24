import React from 'react';
import { Link } from 'gatsby';
import { SearchResultsProps } from './models';
import cx from 'classnames';

const SearchResults = ({
  list,
  activeIndex,
  onClickHandler,
  navigateToItem,
  onHoverHandler,
}: SearchResultsProps) =>
  list.length ? (
    <ul className="search-input__list">
      {list.map((item, index) => {
        const classNames = cx('search-input__link', {
          active: activeIndex === index,
        });

        return (
          <li
            key={index}
            onClick={() => onClickHandler(index)}
            className="search-input__item"
            onMouseEnter={() => onHoverHandler(index)}
          >
            {navigateToItem ? (
              <a className={classNames}>{item}</a>
            ) : (
              <Link className={classNames} to={`/procurar?searchQuery=${item}`}>
                {item}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  ) : null;

export default SearchResults;
