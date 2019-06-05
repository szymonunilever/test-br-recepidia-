import cx from 'classnames';
import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import { TagName, Text } from '../Text';
import { RecipeListingProps } from './models';
import { RecipeCard } from './partials';
import theme from './RecipeListing.module.scss';
import { findIndex } from 'lodash';

const RecipeListing = ({
  className,
  title,
  recipeList,
  titleLevel = 2,
  isFavoriteEnabled = false,
  favorites,
  recipesPerLoad = 4,
  recipesCount = 4,
}: RecipeListingProps) => {
  const wrapClasses = cx(theme['recipe-list'], className);
  const listHeader = title ? (
    <Text
      className="recipe-list__header"
      // @ts-ignore
      tag={TagName[`h${titleLevel}`]}
      text={title}
    />
  ) : null;

  const listItems =
    favorites && favorites.length > 0 && recipeList && recipeList.length > 0
      ? recipeList.map(item => {
          const inFavorite = !!findIndex(favorites, item);
          return Object.assign(item, inFavorite);
        })
      : recipeList;

  const [recipeListItems, setRecipeListItems] = useState({
    listItems:
      listItems && recipesCount > 0
        ? listItems.slice(0, recipesCount)
        : listItems && listItems.length > 0
        ? listItems
        : [],
    recipesCount,
  });

  const loadMore = () => {
    const { listItems, recipesCount } = recipeListItems;
    setRecipeListItems({
      listItems,
      recipesCount: recipesCount + recipesPerLoad,
    });
  };

  return (
    <div data-componentname="recipeListing" className={wrapClasses}>
      {listHeader}
      <ul className="recipe-list__list">
        {recipeListItems.listItems.map(item => {
          return (
            <li key={item.recipeId} className="recipe-list__item">
              <RecipeCard
                enableSelectFavorite={isFavoriteEnabled}
                imgObject={item.localImage.childImageSharp.fluid}
                title={item.title}
                slug={item.slug}
              />
            </li>
          );
        })}
      </ul>
      {recipesCount ? (
        <Button className="recipe-list__button" onClick={loadMore}>
          Load More
        </Button>
      ) : null}
    </div>
  );
};

export default RecipeListing;
