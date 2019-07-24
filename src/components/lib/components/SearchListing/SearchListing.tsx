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
import { SearchListingProps } from './models';
import { get } from 'lodash';
import MediaGallery from '../MediaGallery';
import { SearchParams } from 'src/staticPages/Search/models';

const SearchListing: React.SFC<SearchListingProps> = ({
  content,
  config: { recipeConfig, searchInputConfig, articleConfig },
  search,
  className,
  searchResultTitleLevel = 3,
  searchResults: { recipeResults, searchInputResults, articleResults },
}) => {
  const classNames = cx('search-listing', className);

  const [defaultSearchValue, setDefaultSearchValue] = useState(
    get(search, 'searchQuery')
  );

  useEffect(() => {
    setDefaultSearchValue(get(search, 'searchQuery', ''));
  }, [search]);

  const onSubmit = useCallback(async (searchQuery: string) => {
    setDefaultSearchValue(searchQuery);

    if (recipeConfig.getRecipeSearchData) {
      recipeConfig.getRecipeSearchData(searchQuery, { size: 8 });
    }

    if (articleConfig.getArticleSearchData) {
      articleConfig.getArticleSearchData(searchQuery, { size: 8 });
    }
  }, []);

  const onLoadMoreRecipes = (size: number) => {
    if (recipeConfig.getRecipeSearchData) {
      recipeConfig.getRecipeSearchData(defaultSearchValue, {
        from: recipeResults.list.length,
        size,
      });
    }
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

  const searchResultsText = (
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
  );

  const recipes = !!content.tabsContent.tabs.find(
    tab => get(tab, 'view') === 'recipes'
  ) &&
    recipeResults.list.length && (
      <RecipeListing
        initialCount={8}
        viewType={RecipeListViewType.Advanced}
        loadMoreConfig={{
          type: LoadMoreType.async,
          onLoadMore: onLoadMoreRecipes,
          allCount: recipeResults.count,
        }}
        list={recipeResults.list}
        content={content.recipeContent}
        {...recipeConfig}
      />
    );

  const articles = !!content.tabsContent.tabs.find(
    tab => get(tab, 'view') === 'articles'
  ) &&
    articleResults.list.length && (
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
        content: AppContent.Tabs.Content;
      },
      item
    ) => {
      if (
        item.view === 'all' &&
        (recipeResults.list.length || articleResults.list.length)
      ) {
        tabs.list.push(
          <Tab view={item.view} key={item.view}>
            {searchResultsText}
            {articles}
            {recipes}
          </Tab>
        );
        tabs.content.tabs.push(item);
      }
      if (item.view === 'articles' && articleResults.list.length) {
        tabs.list.push(
          <Tab view={item.view} key={item.view}>
            <Text
              className="search-listing__results-header"
              // @ts-ignore
              tag={TagName[`h${searchResultTitleLevel}`]}
              text={content.searchListingContent.title
                .replace('{numRes}', articleResults.count.toString())
                .replace(
                  '{searchInputValue}',
                  `${defaultSearchValue ? `"${defaultSearchValue}"` : '" "'}`
                )}
            />
            {articles}
          </Tab>
        );
        tabs.content.tabs.push(item);
      }
      if (item.view === 'recipes' && recipeResults.list.length) {
        tabs.list.push(
          <Tab view={item.view} key={item.view}>
            <Text
              className="search-listing__results-header"
              // @ts-ignore
              tag={TagName[`h${searchResultTitleLevel}`]}
              text={content.searchListingContent.title
                .replace('{numRes}', recipeResults.count.toString())
                .replace(
                  '{searchInputValue}',
                  `${defaultSearchValue ? `"${defaultSearchValue}"` : '" "'}`
                )}
            />
            {recipes}
          </Tab>
        );
        tabs.content.tabs.push(item);
      }

      return tabs;
    },
    {
      list: [],
      content: {
        tabs: [],
      },
    }
  );

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

      {(tabs.list.length && recipeResults.list.length) ||
      (tabs.list.length && articleResults.list.length) ? (
        <Tabs content={tabs.content}>{tabs.list.map(tab => tab)}</Tabs>
      ) : (
        <>
          {searchResultsText}
          <NullResult
            content={content.nullResultContent}
            className="search-listing__null-results"
            titleLevel={3}
          />
        </>
      )}
    </div>
  );
};

export default SearchListing;
