import cx from 'classnames';
import { findIndex, remove } from 'lodash';
import React, { useState } from 'react';
import { Button } from '../../common/Button';
import { TagName, Text } from '../Text';
import { RecipeListingProps, RecipeListViewType } from './models';
import { RecipeListingTrivial } from './partials';
import theme from './RecipeListing.module.scss';

const RecipeListing = ({
  className,
  title,
  titleLevel = 2,
  viewType = RecipeListViewType.Base,
  withFavorite = false,
  recipePerLoad = 4,
  favorites = [],
  loadMoreButtonContent = 'Load More',
  list,
  recipeCount = 4,
  onFavoriteChange,
}: RecipeListingProps) => {
  const wrapClasses = cx(theme.recipeList, className);
  const listHeader = title ? (
    <Text
      className="recipe-list__header"
      // @ts-ignore
      tag={TagName[`h${titleLevel}`]}
      text={title}
    />
  ) : null;

  const changeFavorites = ({ id, val }: { id: string; val: boolean }) => {
    val ? favorites.push(id) : remove(favorites, n => n === id);
    if (onFavoriteChange) {
      onFavoriteChange(favorites);
    }
  };

  const listModified =
    withFavorite && favorites.length > 0 && list.length > 0
      ? list.map(item => {
          const inFavorite = !!findIndex(favorites, fav => fav === item.id);
          return Object.assign(item, inFavorite);
        })
      : list;

  const [listState, setListState] = useState({
    listItems:
      recipeCount > 0 ? listModified.slice(0, recipeCount) : listModified,
    recipeCount,
  });

  const loadMore = () => {
    const { recipeCount } = listState;
    setListState({
      listItems: [...listModified],
      recipeCount: recipeCount + recipePerLoad,
    });
  };

  const view: JSX.Element =
    viewType === RecipeListViewType.Trivial ? (
      <RecipeListingTrivial
        list={listState.listItems}
        recipeCount={listState.recipeCount}
        withFavorite={withFavorite}
        onFavoriteChange={changeFavorites}
        // @ts-ignore
        titleLevel={titleLevel + 1}
      />
    ) : (
      <>
        <RecipeListingTrivial
          list={listState.listItems}
          recipeCount={listState.recipeCount}
          withFavorite={withFavorite}
          onFavoriteChange={changeFavorites}
          // @ts-ignore
          titleLevel={titleLevel + 1}
        />
        {recipeCount !== 0 ? (
          <Button className="recipe-list__load-more" onClick={loadMore}>
            {loadMoreButtonContent}
          </Button>
        ) : null}
      </>
    );

  return (
    <div data-componentname="recipeListing" className={wrapClasses}>
      {listHeader}
      {view}
    </div>
  );
};

export default RecipeListing;
