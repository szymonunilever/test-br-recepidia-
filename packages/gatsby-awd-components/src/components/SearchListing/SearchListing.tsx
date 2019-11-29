import { IMAGE_SIZES } from 'gatsby-theme-recepedia/src/constants';
import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
} from 'react';
import { Button } from '../Button';
import {RecipeCard} from '../RecipeCard';
import SearchInput from '../SearchInput';
import { Tabs, Tab } from '../Tabs';
import RecipeListing, { LoadMoreType } from '../RecipeListing';
import cx from 'classnames';

import NullResult from '../NullResult';
import get from 'lodash/get';
import trim from 'lodash/trim';
import MediaGallery from '../MediaGallery';
import { SearchParams } from './models';
import { SearchListingProps } from './models';
import { RatingAndReviewsProvider } from '../../models';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';
import theme from './SearchListing.module.scss';

const SearchListing: FunctionComponent<SearchListingProps> = ({
  content,
  config: { recipeConfig, searchInputConfig, articleConfig },
  searchQuery,
  className,
  searchResults: {
    recipeResults,
    searchInputResults,
    articleResults,
    resultsFetched = true,
  },
}) => {
  const classNames = cx(theme.searchListing, 'search-listing', className);

  const [defaultSearchValue, setDefaultSearchValue] = useState(searchQuery);

  useEffect(() => {
    setDefaultSearchValue(searchQuery);
  }, [searchQuery]);

  const onSubmit = useCallback(
    async (searchQuery: string) => {
      const trimmedSearchQuery = trim(searchQuery);
      setDefaultSearchValue(searchQuery);

      if (recipeConfig.getRecipeSearchData) {
        recipeConfig.getRecipeSearchData(trimmedSearchQuery, {
          size: recipeConfig.initialCount,
        });
      }

      if (articleConfig.getArticleSearchData) {
        articleConfig.getArticleSearchData(trimmedSearchQuery, { size: 8 });
      }
    },
    [recipeConfig.initialCount]
  );

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

  const searchResultsText = resultsFetched
    ? content.searchListingContent.title
        .replace(
          '{numRes}',
          (recipeResults.count + articleResults.count).toString()
        )
        .replace(
          '{searchInputValue}',
          `${defaultSearchValue ? `\n"${trim(defaultSearchValue)}"` : '" "'}`
        )
    : undefined;
  const recipes = (
      <RecipeListing
        loadMoreConfig={{
          type: LoadMoreType.async,
          onLoadMore: onLoadMoreRecipes,
          allCount: recipeResults.count,
        }}
        list={recipeResults.list}
        content={content.recipesContent}
        ratingProvider={RatingAndReviewsProvider.kritique}
        filterTitle={searchResultsText}
        {...recipeConfig}
      >
        {recipeResults.list ? recipeResults.list.map(recipe=>(
          <RecipeCard
            key={recipe.id}
            {...recipe}
            slug={recipe.fields.slug}
            ratingProvider={RatingAndReviewsProvider.kritique}
            imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
            content={{title: recipe.title}}>
            <Button {...recipeConfig.recipeCardButtonPropsDefault} isSelected={recipeConfig.favorites.indexOf(recipe.recipeId)!== -1} onClick={recipeConfig.onFavoriteChange}/>
          </RecipeCard>
        )): []}
      </RecipeListing>
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
    <div
      className={classNames}
      {...getComponentDataAttrs('search-listing', content.searchListingContent)}
    >
      <SearchInput
        searchResults={searchInputResults.list}
        content={content.searchInputContent}
        {...searchInputConfig}
        defaultSearchValue={defaultSearchValue}
        getSearchResults={searchInputConfig.getSearchSuggestionData}
        onSubmit={onSubmit}
        onClickSearchResultsItem={onClickSearchResultsItem}
      />

      <Tabs content={tabs.content}>{tabs.list.map(tab => tab)}</Tabs>
    </div>
  );
};

export default SearchListing;
