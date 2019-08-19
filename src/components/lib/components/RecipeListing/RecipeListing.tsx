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
  RecipeSortingOptionsFieldsMappings,
} from './partials';
import theme from './RecipeListing.module.scss';
import {
  applyContentDefaults,
  applyFilters,
  applyingFavorites,
  sortBy,
} from './utils';
import { get } from 'lodash';
import { RatingAndReviewsProvider } from '../../models/ratings&reviews';
import useKritiqueReload from '../../utils/useKritiqueReload';

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
  onViewChange,
  loadMoreConfig = { type: LoadMoreType.sync },
  tags = { tagGroups: [] },
  dataFetched = true,
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
  const isAsyncLoadMore = () =>
    get(loadMoreConfig, 'type') === LoadMoreType.async;
  const { title, cta, sortSelectPlaceholder } = applyContentDefaults(content);

  const wrapClasses = cx(theme.recipeList, 'recipe-list', className);
  const listWithFavorites = applyingFavorites(list, withFavorite, favorites);
  const [displayNumber, setDisplayNumber] = useState(initialCount);

  useEffect(() => {
    setDisplayNumber(Math.max(initialCount, displayNumber));
  }, [initialCount]);

  let listModified =
    viewType === RecipeListViewType.Advanced
      ? sortBy(RecipeSortingOptions.newest, listWithFavorites)
      : listWithFavorites;

  const getSlicedList = (recList = listModified): Internal.Recipe[] => {
    return !isAsyncLoadMore() ? recList.slice(0, displayNumber) : recList;
  };

  const [sortingValue, setSortingValue] = useState<RecipeSortingOptions>(
    RecipeSortingOptions.newest
  );
  const [filteringValue, setFilteringValue] = useState<Internal.Tag[]>([]);
  const [recipeList, setRecipeList] = useState<Internal.Recipe[]>(
    getSlicedList()
  );
  const allCount = loadMoreConfig.allCount || recipeList.length;

  useEffect(() => {
    setRecipeList(getSlicedList(list));
  }, [list, displayNumber]);

  ratingProvider === RatingAndReviewsProvider.kritique &&
    useKritiqueReload([recipeList]);

  const changeFavorites = ({
    recipeId,
    val,
  }: {
    recipeId: number;
    val: boolean;
  }) => {
    val ? favorites.push(recipeId) : remove(favorites, n => n === recipeId);
    if (onFavoriteChange) {
      onFavoriteChange(favorites);
    }
  };
  const onFilterChange = (filter: Internal.Tag[]) => {
    if (isAsyncLoadMore()) {
      if (onViewChange) {
        onViewChange(
          filter,
          RecipeSortingOptionsFieldsMappings[sortingValue]
        ).then(() => {
          setFilteringValue(filter);
        });
      }
    } else {
      const recipeCount = displayNumber;
      const filtered = applyFilters(filter, sortBy(sortingValue, listModified));
      setRecipeList(
        recipeCount > 0 ? filtered.slice(0, recipeCount) : filtered
      );
      setFilteringValue(filter);
    }
  };

  const onChangeSorting = (sorting: RecipeSortingOptions) => {
    if (isAsyncLoadMore()) {
      if (onViewChange) {
        onViewChange(
          filteringValue,
          RecipeSortingOptionsFieldsMappings[sorting]
        ).then(() => {
          setSortingValue(sorting);
        });
      }
    } else {
      listModified = sortBy(sorting, listModified);

      const recipeCount = displayNumber;
      const filtered = applyFilters(filteringValue, listModified);
      setSortingValue(sorting);
      setRecipeList(
        recipeCount > 0 ? filtered.slice(0, recipeCount) : filtered
      );
      setDisplayNumber(recipeCount);
    }
  };

  const loadMore = () => {
    const recipeCount = displayNumber + recipePerLoad;

    if (isAsyncLoadMore()) {
      //@ts-ignore
      loadMoreConfig.onLoadMore(
        filteringValue,
        RecipeSortingOptionsFieldsMappings[sortingValue],
        recipePerLoad
      );
    } else {
      setRecipeList(
        recipeCount > 0
          ? applyFilters(filteringValue, listModified).slice(0, recipeCount)
          : applyFilters(filteringValue, listModified)
      );
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

  const shouldLoadMoreAppear =
    loadMoreConfig && isAsyncLoadMore()
      ? list.length < allCount
      : recipeList.length > 0 &&
        initialCount !== 0 &&
        displayNumber < list.length;

  const listing = (
    <RecipeListingTrivial
      dataFetched={dataFetched}
      list={recipeList}
      recipeCount={recipeList.length}
      FavoriteIcon={FavoriteIcon}
      withFavorite={withFavorite}
      ratingProvider={ratingProvider}
      onFavoriteChange={changeFavorites}
      content={content}
      // @ts-ignore
      titleLevel={titleLevel + 1}
      imageSizes={imageSizes}
    />
  );
  const recipeListBasic = (
    <>
      {listing}
      {shouldLoadMoreAppear ? (
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
      listing
    ) : viewType == RecipeListViewType.Base ? (
      recipeListBasic
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
          dataFetched={dataFetched}
          className="recipe-list__filter"
          allFilters={tags}
          OpenIcon={OpenIcon}
          FilterIcon={FilterIcon}
          RemoveTagIcon={RemoveTagIcon}
          onChangeFilter={onFilterChange}
          onChangeSorting={onChangeSorting}
          results={
            (loadMoreConfig && loadMoreConfig.allCount) || recipeList.length
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
