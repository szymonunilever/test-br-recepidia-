import React, { useState, useEffect, useCallback } from 'react';
import SearchInput from '../SearchInput';
import withLocation from '../WithLocation';
import { Tabs, Tab } from '../Tabs';
import RecipeListing, { LoadMoreType } from '../RecipeListing';
import cx from 'classnames';

import { Text, TagName } from '../Text';
import NullResult from '../NullResult';
import { SearchListingProps, ResponseRecipeData } from './models';
import { WithLocationProps } from '../WithLocation/models';

const SearchListing: React.SFC<SearchListingProps & WithLocationProps> = ({
  content,
  config,
  searchQuery = '',
  getSearchData,
  className,
  searchResultTitleLevel = 3,
}) => {
  const classNames = cx('search-listing', className);
  const [recipeData, setRecipeData] = useState<
    ResponseRecipeData<Internal.Recipe>[]
  >([]);
  const [defaultSearchValue, setDefaultSearchValue] = useState(searchQuery);
  const [numRes, setNumRes] = useState(0);
  const [dataIsFetched, setDataIsFetched] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      getSearchData(searchQuery, {
        size: 8,
      }).then(data => {
        setRecipeData(data.hits.hits);
        setNumRes(data.hits.total);
        setDataIsFetched(true);

        setDefaultSearchValue(searchQuery);
      });
    }
  }, [searchQuery]);

  const onSubmit = useCallback((value: string) => {
    getSearchData(value, { size: 8 }).then(data => {
      setDataIsFetched(true);
      setRecipeData(data.hits.hits);
      setDefaultSearchValue(value);
      setNumRes(data.hits.total);
    });
  }, []);

  const onLoadMoreRecipes = useCallback(
    (size: number) =>
      getSearchData(defaultSearchValue, { from: recipeData.length, size })
        .then(data => {
          setRecipeData([...recipeData, ...data.hits.hits]);
        })
        .catch(err => {
          throw new Error(err);
        }),
    [defaultSearchValue, recipeData]
  );

  const onClickSearchResultsItem = useCallback(
    () => (itemValue: string) =>
      getSearchData(itemValue, { size: 8 }).then(data => {
        setRecipeData(data.hits.hits);
        setNumRes(data.hits.total);
        setDataIsFetched(true);
      }),
    []
  );

  const tabs = content.tabsContent.tabs.reduce(
    (tabs: JSX.Element[], { view }) => {
      switch (view) {
        case 'all': {
          tabs.push(
            <Tab view={view} key={view}>
              <Text
                className="search-listing__results-header"
                // @ts-ignore
                tag={TagName[`div`]}
                text={content.searchListingContent.title
                  .replace('{numRes}', numRes.toString())
                  .replace(
                    '{searchInputValue}',
                    `${defaultSearchValue ? `"${defaultSearchValue}"` : '" "'}`
                  )}
              />
              <RecipeListing
                loadMoreConfig={{
                  type: LoadMoreType.async,
                  onLoadMore: onLoadMoreRecipes,
                  allCount: numRes,
                }}
                list={recipeData.map(item => item._source)}
                content={content.recipesContent}
                {...config.recipesConfig}
              />
            </Tab>
          );
          break;
        }

        case 'recipes': {
          tabs.push(
            <Tab view={view} key={view}>
              <Text
                className="search-listing__results-header"
                // @ts-ignore
                tag={TagName[`div`]}
                text={content.searchListingContent.title
                  .replace('{numRes}', numRes.toString())
                  .replace(
                    '{searchInputValue}',
                    `${defaultSearchValue ? `"${defaultSearchValue}"` : '" "'}`
                  )}
              />
              <RecipeListing
                loadMoreConfig={{
                  type: LoadMoreType.async,
                  onLoadMore: onLoadMoreRecipes,
                  allCount: numRes,
                }}
                list={recipeData.map(item => item._source)}
                content={content.recipesContent}
                {...config.recipesConfig}
              />
            </Tab>
          );
          break;
        }
      }

      return tabs;
    },
    []
  );

  return (
    <div className={classNames} data-componentname="search-listing">
      <SearchInput
        content={content.searchInputContent}
        {...config.searchInputConfig}
        defaultSearchValue={defaultSearchValue}
        getSearchData={getSearchData}
        onSubmit={onSubmit}
        onClickSearchResultsItem={onClickSearchResultsItem}
      />

      {recipeData.length ? (
        <Tabs content={content.tabsContent}>{tabs.map(tab => tab)}</Tabs>
      ) : dataIsFetched ? (
        <>
          <Text
            className="search-listing__results-header"
            // @ts-ignore
            tag={TagName[`div`]}
            text={content.searchListingContent.title
              .replace('{numRes}', numRes.toString())
              .replace(
                '{searchInputValue}',
                `${defaultSearchValue ? `"${defaultSearchValue}"` : '" "'}`
              )}
          />
          <NullResult
            content={content.nullResultContent}
            className="search-listing__null-results"
            titleLevel={3}
          />
        </>
      ) : null}
    </div>
  );
};

export default withLocation(SearchListing);
