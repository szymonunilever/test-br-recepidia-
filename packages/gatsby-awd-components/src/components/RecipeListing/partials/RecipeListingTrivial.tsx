import React, { FunctionComponent, ReactElement } from 'react';
import { NullResult } from '../../NullResult';
import { RecipeCard, RecipeCardProps } from './index';
import { RecipeListingTrivialProps } from './models';
import { RatingAndReviewsProvider } from '../../../models';
import cx from 'classnames';
import theme from './RecipeListingTrivial.module.scss';

const RecipeListingTrivial: FunctionComponent<RecipeListingTrivialProps> = ({
  titleLevel = 3,
  content: { nullResult },
  dataFetched = true,
  children,
}) => {
  const noResults =
    nullResult && dataFetched ? (
      <NullResult
        content={nullResult}
        className={cx(
          theme.recipeList__nullResults,
          'recipe-list__null-results'
        )}
        titleLevel={titleLevel}
      />
    ) : null;

  let listItems;

    if (Array.isArray(children) && children.length > 0) {
      const items = children as ReactElement<RecipeCardProps>[];
      listItems = items.map(item => {
        return (
          <li
            key={item.props.id}
            className={cx(theme.recipeList__item, 'recipe-list__item')}
          >
            {item}
          </li>
        );
      });
    } else if(children && children.hasOwnProperty('props')) {
      const child = children as ReactElement<RecipeCardProps>;
      listItems =  <li
        key={child.props.id}
        className={cx(theme.recipeList__item, 'recipe-list__item')}
      >
        {child}
      </li>
    }
  return (
    <ul className={cx(theme.recipeList__list, 'recipe-list__list')}>
      {listItems || noResults}
    </ul>
  );
};

export default RecipeListingTrivial;
