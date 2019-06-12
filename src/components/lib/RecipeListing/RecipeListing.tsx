import cx from 'classnames';
import { remove } from 'lodash';
import React, { useState } from 'react';
import { Button } from '../common/Button';
import { TagName, Text } from '../Text';
import { RecipeListingProps, RecipeListViewType } from './models';
import {
  RecipeFilter,
  RecipeListingTrivial,
  RecipeSortingOptions,
  Tag,
} from './partials';
import theme from './RecipeListing.module.scss';
import { applyContentDefaults, applyingFavorites, sortBy } from './utils';

const RecipeListing = ({
  className,
  content,
  titleLevel = 2,
  viewType = RecipeListViewType.Base,
  withFavorite = false,
  recipePerLoad = 4,
  favorites = [],
  list,
  initialCount = 4,
  onFavoriteChange,
  tags = { categories: [] },
}: RecipeListingProps) => {
  const {
    title,
    cta,
    resultLabel,
    resultLabelPlural,
    optionLabels,
    sortSelectPlaceholder,
  } = applyContentDefaults(content);
  const wrapClasses = cx(theme.recipeList, className);
  const listHeader = title ? (
    <Text
      className="recipe-list__header"
      // @ts-ignore
      tag={TagName[`h${titleLevel}`]}
      text={title}
    />
  ) : null;

  let listModified = sortBy(
    RecipeSortingOptions.Newest,
    applyingFavorites(list, withFavorite, favorites)
  );

  const [listState, setListState] = useState({
    listItems:
      initialCount > 0 ? listModified.slice(0, initialCount) : listModified,
  });

  const changeFavorites = ({ id, val }: { id: string; val: boolean }) => {
    val ? favorites.push(id) : remove(favorites, n => n === id);
    if (onFavoriteChange) {
      onFavoriteChange(favorites);
    }
  };
  const onFilterChange = (filter: Tag[]) => {
    // eslint-disable-next-line no-console
    console.log(filter);
  };

  const onChangeSorting = (sorting: RecipeSortingOptions) => {
    const recipeCount = listState.listItems.length;
    listModified = sortBy(sorting, listModified);
    setListState({
      listItems:
        recipeCount > 0 ? listModified.slice(0, recipeCount) : listModified,
    });
  };

  const loadMore = () => {
    const recipeCount = listState.listItems.length + recipePerLoad;
    setListState({
      listItems:
        recipeCount > 0 ? listModified.slice(0, recipeCount) : listModified,
    });
  };

  const view: JSX.Element =
    viewType === RecipeListViewType.Trivial ? (
      <RecipeListingTrivial
        list={listState.listItems}
        recipeCount={listState.listItems.length}
        withFavorite={withFavorite}
        onFavoriteChange={changeFavorites}
        // @ts-ignore
        titleLevel={titleLevel + 1}
      />
    ) : viewType === RecipeListViewType.Base ? (
      <>
        <RecipeListingTrivial
          list={listState.listItems}
          recipeCount={listState.listItems.length}
          withFavorite={withFavorite}
          onFavoriteChange={changeFavorites}
          // @ts-ignore
          titleLevel={titleLevel + 1}
        />
        {listState.listItems.length > 0 && initialCount !== 0 ? (
          <Button
            className="recipe-list__load-more"
            onClick={loadMore}
            hidden={listState.listItems.length === listModified.length}
            content={cta}
          />
        ) : null}
      </>
    ) : (
      <>
        <RecipeFilter
          className="recipe-list__filter"
          allFilters={tags}
          onChangeFilter={onFilterChange}
          onChangeSorting={onChangeSorting}
          resultLabel={resultLabel}
          resultLabelPlural={resultLabelPlural}
          results={listModified.length}
          optionLabels={optionLabels}
          sortSelectPlaceholder={sortSelectPlaceholder}
        />
        <RecipeListingTrivial
          list={listState.listItems}
          recipeCount={listState.listItems.length}
          withFavorite={withFavorite}
          onFavoriteChange={changeFavorites}
          // @ts-ignore
          titleLevel={titleLevel + 1}
        />
        {listState.listItems.length > 0 && initialCount !== 0 ? (
          <Button
            className="recipe-list__load-more"
            onClick={loadMore}
            hidden={listState.listItems.length === listModified.length}
            content={cta}
          />
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
