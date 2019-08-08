import React, { useState, useEffect, useCallback } from 'react';
import SearchInput from '../SearchInput';
import { Tabs, Tab } from '../Tabs';
import RecipeListing, {
  LoadMoreType,
  RecipeListViewType,
} from '../RecipeListing';
import cx from 'classnames';

import { Text, TagName } from '../Text';
import NullResult from '../NullResult';
import { get } from 'lodash';
import MediaGallery from '../MediaGallery';
import { SearchParams } from './models';
import { SearchListingProps } from './models';
import { RatingAndReviewsProvider } from '../../models/ratings&reviews';

const SearchListing: React.SFC<SearchListingProps> = ({
  content,
  config: { recipeConfig, searchInputConfig, articleConfig },
  searchQuery,
  className,
  searchResultTitleLevel = 3,
  searchResults: {
    recipeResults,
    searchInputResults,
    articleResults,
    resultsFetched = true,
  },
}) => {
  const classNames = cx('search-listing', className);

  const [defaultSearchValue, setDefaultSearchValue] = useState(searchQuery);

  useEffect(() => {
    setDefaultSearchValue(searchQuery);
  }, [searchQuery]);

  const onSubmit = useCallback(async (searchQuery: string) => {
    setDefaultSearchValue(searchQuery);

    if (recipeConfig.getRecipeSearchData) {
      recipeConfig.getRecipeSearchData(searchQuery, { size: 8 });
    }

    if (articleConfig.getArticleSearchData) {
      articleConfig.getArticleSearchData(searchQuery, { size: 8 });
    }
  }, []);

  const onLoadMoreRecipes = async (
    tags: Internal.Tag[],
    sorting: string,
    size: number
  ) => {
    if (recipeConfig.getRecipeSearchData) {
      return recipeConfig.getRecipeSearchData(defaultSearchValue, {
        from: recipeResults.list.length,
        size,
      });
    }

    return Promise.resolve();
  };

  const onLoadMoreArticles = (size: number) => {
    if (articleConfig.getArticleSearchData) {
      articleConfig.getArticleSearchData(defaultSearchValue, {
        from: articleResults.list.length,
        size,
      });
    }
  };

  const onClickSearchResultsItem = useCallback(
    async (searchQuery: string, params: SearchParams) => {
      setDefaultSearchValue(searchQuery);

      if (searchInputConfig.onClickSearchResultsItem) {
        searchInputConfig.onClickSearchResultsItem(searchQuery, {
          size: params.size,
        });
      }
    },
    []
  );

  const searchResultsText = resultsFetched ? (
    <Text
      className="search-listing__results-header"
      // @ts-ignore
      tag={TagName[`h${searchResultTitleLevel}`]}
      text={content.searchListingContent.title
        .replace(
          '{numRes}',
          (recipeResults.count + articleResults.count).toString()
        )
        .replace(
          '{searchInputValue}',
          `${defaultSearchValue ? `"${defaultSearchValue}"` : '" "'}`
        )}
    />
  ) : null;

  const recipes = !!content.tabsContent.tabs.find(
    tab => get(tab, 'view') === 'recipes'
  ) &&
    !!recipeResults.list.length && (
      <RecipeListing
        initialCount={8}
        viewType={RecipeListViewType.Advanced}
        loadMoreConfig={{
          type: LoadMoreType.async,
          onLoadMore: onLoadMoreRecipes,
          allCount: recipeResults.count,
        }}
        list={recipeResults.list}
        content={content.recipesContent}
        ratingProvider={RatingAndReviewsProvider.kritique}
        {...recipeConfig}
      />
    );

  const articles = !!content.tabsContent.tabs.find(
    tab => get(tab, 'view') === 'articles'
  ) &&
    !!articleResults.list.length && (
      <MediaGallery
        content={content.articleContent}
        onLoadMore={onLoadMoreArticles}
        list={articleResults.list}
        allCount={articleResults.count}
      />
    );

  const tabs = content.tabsContent.tabs.reduce(
    (
      tabs: {
        list: JSX.Element[];
        content: {
          tabs: AppContent.Tabs.Tab[];
        };
      },
      tab
    ) => {
      const { view } = tab;

      switch (view) {
        case 'all': {
          tabs.list.push(
            <Tab view={view} key={view}>
              {recipes}
              {articles}
            </Tab>
          );
          tabs.content.tabs.push({
            ...tab,
            resultsCount: recipeResults.count + articleResults.count,
          });
          break;
        }

        case 'articles': {
          tabs.list.push(
            <Tab view={view} key={view}>
              {articles}
            </Tab>
          );
          tabs.content.tabs.push({
            ...tab,
            resultsCount: articleResults.count,
          });

          break;
        }
        case 'recipes': {
          tabs.list.push(
            <Tab view={view} key={view}>
              {recipes}
            </Tab>
          );
          tabs.content.tabs.push({
            ...tab,
            resultsCount: recipeResults.count,
          });
          break;
        }
      }

      return tabs;
    },
    { list: [], content: { tabs: [] } }
  );

  const nullResult = resultsFetched ? (
    <NullResult
      content={content.nullResultContent}
      className="search-listing__null-results"
      titleLevel={3}
    />
  ) : null;

  return (
    <div className={classNames} data-componentname="search-listing">
      <SearchInput
        searchResults={searchInputResults.list}
        content={content.searchInputContent}
        {...searchInputConfig}
        defaultSearchValue={defaultSearchValue}
        getSearchResults={searchInputConfig.getSearchSuggestionData}
        onSubmit={onSubmit}
        onClickSearchResultsItem={onClickSearchResultsItem}
      />

      {searchResultsText}
      {tabs.list.length &&
      (articleResults.list.length || recipeResults.list.length) ? (
        <Tabs content={tabs.content}>{tabs.list.map(tab => tab)}</Tabs>
      ) : (
        nullResult
      )}
    </div>
  );
};

export default SearchListing;
