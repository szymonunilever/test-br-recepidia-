import React, { FunctionComponent, ReactElement } from 'react';
import { NullResult } from '../../NullResult';
import { RecipeListingTrivialProps } from './models';
import cx from 'classnames';
import theme from './RecipeListingTrivial.module.scss';

const RecipeListingTrivial: FunctionComponent<RecipeListingTrivialProps> = ({
  titleLevel = 3,
  content: { nullResult },
  dataFetched = true,
  children,
  holders,
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

  let holderItems = children && Array.isArray(children) && holders && holders.map((holder,i)=>(
    <li
      key={'holder' + (children.length + i)}
      className={cx(theme.recipeList__item, 'recipe-list__item')}
    >
      {holder}
    </li>
  ));

    if (Array.isArray(children) && children.length > 0) {
      // @ts-ignore
      listItems = children.map((item) => {
        return (
          <li
            key={item.props.slug}
            className={cx(theme.recipeList__item, 'recipe-list__item')}
          >
            {item}
          </li>
        );
      });
      holderItems && listItems.push(...holderItems);
    } else if(children && children.hasOwnProperty('props')) {
      // @ts-ignore
      listItems =  [<li tabIndex={0} key={children.props.slug}
        className={cx(theme.recipeList__item, 'recipe-list__item')}
      >
        {children}
      </li>];
      holderItems && listItems.push(...holderItems);
    }

  return (
    <ul className={cx(theme.recipeList__list, 'recipe-list__list')}>
      {listItems || noResults}
    </ul>
  );
};

export default RecipeListingTrivial;
