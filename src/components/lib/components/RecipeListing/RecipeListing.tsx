import cx from 'classnames';
import { remove } from 'lodash';
import React, { useState } from 'react';
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
  imageSizes,
}: RecipeListingProps) => {
  const { title, cta, sortSelectPlaceholder } = applyContentDefaults(content);

  const wrapClasses = cx(theme.recipeList, 'recipe-list', className);
  const listWithFavorites = applyingFavorites(list, withFavorite, favorites);
  let listModified =
    viewType === RecipeListViewType.Advanced
      ? sortBy(RecipeSortingOptions.newest, listWithFavorites)
      : listWithFavorites;

  const [displayNumber, setDisplayNumber] = useState(initialCount);
  const [listState, setListState] = useState<{
    listItems: Internal.Recipe[];
    filterLength: number;
    filter: RMSData.Tag[];
    sorting: RecipeSortingOptions;
  }>({
    listItems: [],
    filterLength: listModified.length,
    filter: [],
    sorting: RecipeSortingOptions.newest,
  });

  const isAsyncLoadMore = () =>
    get(loadMoreConfig, 'type') === LoadMoreType.async;

  const changeFavorites = ({ id, val }: { id: string; val: boolean }) => {
    val ? favorites.push(id) : remove(favorites, n => n === id);
    if (onFavoriteChange) {
      onFavoriteChange(favorites);
    }
  };
  const onFilterChange = (filter: RMSData.Tag[]) => {
    if (isAsyncLoadMore()) {
      const filtered = applyFilters(filter, listModified);

      setListState({
        ...listState,
        listItems: filtered,
        filterLength: filtered.length,
        filter,
      });
    } else {
      const recipeCount = displayNumber;
      listModified = sortBy(listState.sorting, listModified);
      const filtered = applyFilters(filter, listModified);

      setListState({
        ...listState,
        listItems: recipeCount > 0 ? filtered.slice(0, recipeCount) : filtered,
        filterLength: filtered.length,
        filter,
      });
    }
  };

  const onChangeSorting = (sorting: RecipeSortingOptions) => {
    if (isAsyncLoadMore()) {
      listModified = sortBy(sorting, listState.listItems);

      setListState({
        ...listState,
        listItems: listModified,
        sorting,
      });
    } else {
      listModified = sortBy(sorting, listModified);

      const recipeCount = displayNumber;
      const { filter } = listState;
      const filtered = applyFilters(filter, listModified);

      setListState({
        ...listState,
        listItems: recipeCount > 0 ? filtered.slice(0, recipeCount) : filtered,
        sorting,
      });
      setDisplayNumber(recipeCount);
    }
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
      ? list.length < loadMoreConfig.allCount
      : listState.listItems.length > 0 &&
        initialCount !== 0 &&
        displayNumber < listState.filterLength;

  const recipeListBasic = (
    <>
      <RecipeListingTrivial
        list={list}
        recipeCount={list.length}
        FavoriteIcon={FavoriteIcon}
        withFavorite={withFavorite}
        ratingProvider={ratingProvider}
        onFavoriteChange={changeFavorites}
        content={content}
        // @ts-ignore
        titleLevel={titleLevel + 1}
        imageSizes={imageSizes}
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
        imageSizes={imageSizes}
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
        imageSizes={imageSizes}
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
          results={
            listState.filterLength ||
            (loadMoreConfig && loadMoreConfig.allCount) ||
            0
          }
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
