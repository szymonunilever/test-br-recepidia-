import { IMAGE_SIZES } from 'gatsby-theme-recepedia/src/constants';
import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
} from 'react';
import { Button } from '../Button';
import { RecipeCard } from '../RecipeCard';
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
import { icons } from '../../mocks/global';
import Filter from '../Filter/Filter';
import { CardLinkWrapper } from '../CardLinkWrapper';

const SearchListing: FunctionComponent<SearchListingProps> = ({
  content,
  config: { recipeConfig, searchInputConfig, articleConfig },
  searchQuery,
  className,
  searchResults: {
    recipeResults,
    searchInputResults,
    articleResults,
    recipeResultsFetched = true,
    articleResultsFetched = true,
  },
}) => {
  const classNames = cx(theme.searchListing, 'search-listing', className);
  const [filteringValue, setFilteringValue] = useState<Internal.Tag[]>([]);
  const [defaultSearchValue, setDefaultSearchValue] = useState(searchQuery);

  useEffect(() => {
    setDefaultSearchValue(searchQuery);
  }, [searchQuery]);

  const onSubmit = useCallback(
    (searchQuery: string) => {
      const trimmedSearchQuery = trim(searchQuery);
      if(searchQuery !== defaultSearchValue) {
        setDefaultSearchValue(searchQuery);
      }

      setFilteringValue([]);

      if (recipeConfig.getRecipeSearchData) {
        recipeConfig.getRecipeSearchData(trimmedSearchQuery, {
          size: recipeConfig.initialCount,
        });
      }

      if (articleConfig.getArticleSearchData) {
        articleConfig.getArticleSearchData(trimmedSearchQuery, {
          size: articleConfig.initialCount,
        });
      }
    },
    [recipeConfig.initialCount]
  );

  const onLoadMoreRecipes = async (
    tags: Internal.Tag[],
    sorting: string,
    size: number
  ) => {
    if (recipeConfig.onViewChange) {
      return recipeConfig.onViewChange(filteringValue, {
        from: recipeResults.list.length,
        size: size,
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

  const searchResultsText = content.searchListingContent.title
    .replace(
      '{numRes}',
      (recipeResults.count + articleResults.count).toString()
    )
    .replace(
      '{searchInputValue}',
      `${defaultSearchValue ? `\n"${trim(defaultSearchValue)}"` : '" "'}`
    );

  const loadMoreConfig = {
    type: LoadMoreType.async,
    onLoadMore: onLoadMoreRecipes,
    allCount: recipeResults.count,
  };

  const recipes = !!recipeResults.list.length && (
    <RecipeListing
      list={recipeResults.list}
      titleLevel={2}
      content={content.recipesContent}
      ratingProvider={RatingAndReviewsProvider.inline}
      loadMoreConfig={loadMoreConfig}
      {...recipeConfig}
      hideFilter
    >
      {recipeResults.list
        ? recipeResults.list.map(recipe => (
          <CardLinkWrapper
            title={recipe.title}
            key={recipe.id}
            cardKey={recipe.id}
            slug={recipe.fields.slug}
            cardKey={recipe.id}>
            <RecipeCard
              {...recipe}
              slug={recipe.fields.slug}
              ratingProvider={RatingAndReviewsProvider.inline}
              imageSizes={IMAGE_SIZES.RECIPE_LISTINGS.STANDARD}
              content={{ title: recipe.title }}
            >
              <Button
                {...recipeConfig.recipeCardButtonPropsDefault}
                isSelected={
                  recipeConfig.favorites.indexOf(recipe.recipeId) !== -1
                }
                onClick={recipeConfig.onFavoriteChange}
              />
            </RecipeCard>
          </CardLinkWrapper>
          ))
        : []}
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

  const onChangeFilter = (filter: Internal.Tag[]) => {
    if (recipeConfig.onViewChange) {
      recipeConfig.onViewChange(filter, null).then(() => {
        setFilteringValue(filter);
      });
    }

    if (articleConfig.onArticleViewChange) {
      articleConfig.onArticleViewChange(filter, null);
    }
  };

  return (
    <div
      className={classNames}
      {...getComponentDataAttrs('search-listing', content.searchListingContent)}
    >
      <SearchInput
        searchPagePath={searchInputConfig.searchPagePath}
        searchResults={searchInputResults.list}
        content={content.searchInputContent}
        {...searchInputConfig}
        defaultSearchValue={defaultSearchValue}
        getSearchResults={searchInputConfig.getSearchSuggestionData}
        onSubmit={onSubmit}
        onClickSearchResultsItem={onClickSearchResultsItem}
      />
      <Filter
        className={cx(theme.recipeList__filter, 'wrapper search-filter')}
        // @ts-ignore
        allFilters={recipeConfig.tags}
        icons={icons}
        onChangeFilter={onChangeFilter}
        content={content.recipesContent}
        filterTitle={searchResultsText}
        currentFilters={filteringValue}
        searchQuery={defaultSearchValue}
        results={recipeResults.count + articleResults.count}
      />
      {recipeResults.count + articleResults.count ? (
        <Tabs className="search-tabs" content={tabs.content}>
          {tabs.list.map(tab => tab)}
        </Tabs>
        ) : null
      }
    </div>
  );
};

export default SearchListing;
