import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';

import SearchListing from 'src/components/lib/components/SearchListing';

import CloseSvg from 'src/svgs/inline/x-mark.svg';
import PlaceholderIcon from '../src/svgs/inline/placeholder.svg';
import FavoriteIcon from 'src/svgs/inline/favorite.svg';
import { RecipeListViewType } from 'src/components/lib/components/RecipeListing';
import recipes from 'src/components/data/newRecipes.json';
import articles from 'src/components/data/articleList.json';

const searchInputContent: AppContent.SearchInput.Content = {
  title: 'Looking for something?',
};

const tabsContent: AppContent.Tabs.Content = {
  tabs: [
    {
      title: 'All',
      view: 'all',
    },
    {
      title: 'Articles',
      view: 'articles',
    },
    {
      title: 'Recipes',
      view: 'recipes',
    },
  ],
};

const recipesContent = {
  title: 'Recipes',
  cta: { label: 'Load More Button' },
  nullResult: {
    title: 'Oops! No results',
    subtitle: 'Maybe try the following:',
    textList: [`Don't use too many filters at once`, `Try using only filters`],
  },
};

const searchListingContent = {
  title: 'We found {numRes} results with: {searchInputValue}',
};

const nullResultContent = {
  subtitle: 'Maybe try the following:',
  textList: [
    'Use short keywords in your search',
    'Try not to use too long phrases',
    "Don't use too many filter at once",
    'Try using only filters',
  ],
};

const articleContent = {
  title: 'Articles',
  cta: {
    label: 'Load more',
  },
};

const searchInputConfig = {
  searchResultsCount: 8,
  labelIcon: <PlaceholderIcon />,
  buttonResetIcon: <CloseSvg />,
  buttonSubmitIcon: <PlaceholderIcon />,
  getSearchSuggestionData: async () => {},
  onSubmit: () => {},
};

const articleConfig = {
  getArticleSearchData: async () => {},
};

const recipeConfig = {
  viewType: RecipeListViewType.Base,
  FavoriteIcon: FavoriteIcon,
  withFavorite: true,
  initialCount: 2,
  recipePerLoad: 2,
  favorites: [],
  onFavoriteChange: action('favorites were changed'),
  imageSizes: '(min-width: 768px) 25vw, 50vw',
};

const getSearchData = async () => {};
const getSearchSuggestionData = async () => {};

storiesOf('Components/Search listing', module)
  .add('With no results', () => {
    const recipeResults = {
      list: [],
      count: 0,
    };

    const searchInputResults = {
      list: [],
      count: 0,
    };

    const articleResults = {
      list: [],
      count: 0,
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        <SearchListing
          searchQuery={''}
          searchResultTitleLevel={3}
          searchResults={{
            recipeResults,
            searchInputResults,
            articleResults,
          }}
          content={{
            searchListingContent,
            searchInputContent,
            articleContent,
            tabsContent,
            recipesContent,
            nullResultContent,
          }}
          config={{ searchInputConfig, recipeConfig, articleConfig }}
        />
      </div>
    );
  })
  .add('With results', () => {
    const recipeResults = {
      list: recipes,
      count: 12,
    };

    const searchInputResults = {
      list: [],
      count: 0,
    };

    const articleResults = {
      list: articles,
      count: 10,
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        <SearchListing
          search={{ searchQuery: 'burger' }}
          searchResultTitleLevel={3}
          getSearchData={getSearchData}
          getSearchSuggestionData={getSearchSuggestionData}
          searchResults={{
            //@ts-ignore
            recipeResults,
            //@ts-ignore
            articleResults,
            searchInputResults,
          }}
          content={{
            searchListingContent,
            articleContent,
            searchInputContent,
            tabsContent,
            recipesContent,
            nullResultContent,
          }}
          config={{ searchInputConfig, recipeConfig, articleConfig }}
        />
      </div>
    );
  });
