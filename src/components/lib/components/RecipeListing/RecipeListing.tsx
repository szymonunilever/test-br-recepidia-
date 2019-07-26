import cx from 'classnames';
import { remove } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Button } from '../Button';
import { TagName, Text } from '../Text';
import { RecipeListingProps, RecipeListViewType, LoadMoreType } from './models';
import RecipeListingCarousel from './RecipeListingCarousel';
import {
  RecipeFilter,
  RecipeListingTrivial,
  RecipeSortingOptions,
} from './partials';
import theme from './RecipeListing.module.scss';
import {
  applyContentDefaults,
  applyFilters,
  applyingFavorites,
  sortBy,
} from './utils';
import { get } from 'lodash';

export const RecipeListing = ({
  className,
  content,
  titleLevel = 2,
  viewType = RecipeListViewType.Base,
  RemoveTagIcon,
  ratingProvider,
  FavoriteIcon,
  OpenIcon,
  withFavorite = false,
  FilterIcon,
  recipePerLoad = 4,
  favorites = [],
  list,
  initialCount = 4,
  onFavoriteChange,
  loadMoreConfig,
  tags = { tagGroups: [] },
  carouselConfig = {
    breakpoints: [
      {
        width: 1366,
        switchElementsBelowBreakpoint: 1,
        switchElementsAfterBreakpoint: 2,
        visibleElementsBelowBreakpoint: 2,
        visibleElementsAboveBreakpoint: 4,
      },
    ],
  },
}: RecipeListingProps) => {
  const { title, cta, sortSelectPlaceholder } = applyContentDefaults(content);

  const wrapClasses = cx(theme.recipeList, 'recipe-list', className);
  let listModified = sortBy(
    RecipeSortingOptions.newest,
    applyingFavorites(list, withFavorite, favorites)
  );

  const [displayNumber, setDisplayNumber] = useState(initialCount);
  const [listState, setListState] = useState<{
    listItems: Internal.Recipe[];
    filterLength: number;
    filter: RMSData.Tag[];
    sorting: RecipeSortingOptions;
  }>({
    listItems:
      initialCount > 0 ? listModified.slice(0, initialCount) : listModified,
    filterLength: listModified.length,
    filter: [],
    sorting: RecipeSortingOptions.newest,
  });

  const isAsyncLoadMore = () =>
    get(loadMoreConfig, 'type') === LoadMoreType.async;

  useEffect(() => {
    const syncList =
      initialCount > 0 ? listModified.slice(0, initialCount) : listModified;

    setListState({
      ...listState,
      listItems: isAsyncLoadMore() ? list : syncList,
    });
  }, [list]);

  const changeFavorites = ({ id, val }: { id: string; val: boolean }) => {
    val ? favorites.push(id) : remove(favorites, n => n === id);
    if (onFavoriteChange) {
      onFavoriteChange(favorites);
    }
  };
  const onFilterChange = (filter: RMSData.Tag[]) => {
    const recipeCount = displayNumber;
    listModified = sortBy(listState.sorting, listModified);
    const filtered = applyFilters(filter, listModified);
    setListState({
      ...listState,
      listItems: recipeCount > 0 ? filtered.slice(0, recipeCount) : filtered,
      filterLength: filtered.length,
      filter,
    });
  };

  const onChangeSorting = (sorting: RecipeSortingOptions) => {
    const recipeCount = displayNumber;
    const { filter } = listState;
    listModified = sortBy(sorting, listModified);
    const filtered = applyFilters(filter, listModified);
    setListState({
      ...listState,
      listItems: recipeCount > 0 ? filtered.slice(0, recipeCount) : filtered,
      sorting,
    });
  };

  const loadMore = () => {
    const recipeCount = displayNumber + recipePerLoad;

    if (isAsyncLoadMore()) {
      //@ts-ignore
      loadMoreConfig.onLoadMore(recipePerLoad);
    } else {
      const { filter } = listState;
      setListState({
        ...listState,
        listItems:
          recipeCount > 0
            ? applyFilters(filter, listModified).slice(0, recipeCount)
            : applyFilters(filter, listModified),
      });
    }

    setDisplayNumber(recipeCount);
  };

  const listHeader = title ? (
    <Text
      className="recipe-list__header"
      // @ts-ignore
      tag={TagName[`h${titleLevel}`]}
      text={title}
    />
  ) : null;

  const shouldAppear =
    isAsyncLoadMore() && loadMoreConfig
      ? listState.listItems.length < loadMoreConfig.allCount
      : listState.listItems.length > 0 &&
        initialCount !== 0 &&
        displayNumber < listState.filterLength;

  const recipeListBasic = (
    <>
      <RecipeListingTrivial
        list={listState.listItems}
        recipeCount={listState.listItems.length}
        FavoriteIcon={FavoriteIcon}
        withFavorite={withFavorite}
        ratingProvider={ratingProvider}
        onFavoriteChange={changeFavorites}
        content={content}
        // @ts-ignore
        titleLevel={titleLevel + 1}
      />
      {shouldAppear ? (
        <Button
          className="recipe-list__load-more"
          onClick={loadMore}
          content={cta}
        />
      ) : null}
    </>
  );

  const view: JSX.Element =
    viewType == RecipeListViewType.Trivial ? (
      <RecipeListingTrivial
        list={listState.listItems}
        recipeCount={listState.listItems.length}
        FavoriteIcon={FavoriteIcon}
        withFavorite={withFavorite}
        ratingProvider={ratingProvider}
        onFavoriteChange={changeFavorites}
        content={content}
        // @ts-ignore
        titleLevel={titleLevel + 1}
      />
    ) : viewType == RecipeListViewType.Base ? (
      <>{recipeListBasic}</>
    ) : viewType == RecipeListViewType.Carousel ? (
      <RecipeListingCarousel
        withFavorite={withFavorite}
        FavoriteIcon={FavoriteIcon}
        onFavoriteChange={changeFavorites}
        list={list}
        content={content}
        config={carouselConfig}
        ratingProvider={ratingProvider}
        // @ts-ignore
        titleLevel={titleLevel + 1}
      />
    ) : (
      <>
        <RecipeFilter
          className="recipe-list__filter"
          allFilters={tags}
          OpenIcon={OpenIcon}
          FilterIcon={FilterIcon}
          RemoveTagIcon={RemoveTagIcon}
          onChangeFilter={onFilterChange}
          onChangeSorting={onChangeSorting}
          results={listState.filterLength}
          content={content}
          sortSelectPlaceholder={sortSelectPlaceholder}
        />
        <>{recipeListBasic}</>
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
