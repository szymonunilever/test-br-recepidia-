import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';

import { ButtonViewType, FilterIcons, RatingAndReviewsProvider, RecipeListViewType, SearchListing } from '../index';
import { ReactComponent as CloseSvg } from 'src/svgs/inline/x-mark.svg';
import { ReactComponent as SearchSvg } from 'src/svgs/inline/search-icon.svg';
import { ReactComponent as FavoriteIcon } from 'src/svgs/inline/favorite.svg';
import {list as recipes} from '../mocks/RecipeListing';
import articles from '../mocks/articleList.json';
import { ReactComponent as ClosedIcon } from 'src/svgs/inline/arrow-up.svg';
import { ReactComponent as FilterIcon } from 'src/svgs/inline/filter.svg';
import { ReactComponent as OpenIcon } from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as RemoveTagIcon } from 'src/svgs/inline/x-mark.svg';
const searchInputContent: AppContent.SearchInput.Content = {
  title: 'Looking for something?',
};

const icons: FilterIcons = {
  close: CloseSvg,
  closed: ClosedIcon,
  filter: FilterIcon,
  open: OpenIcon,
  removeTag: RemoveTagIcon,
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
  labelIcon: <SearchSvg />,
  buttonResetIcon: <CloseSvg />,
  buttonSubmitIcon: <SearchSvg />,
  getSearchSuggestionData: async () => {},
  onSubmit: () => {},
};

const articleConfig = {
  getArticleSearchData: async () => {},
  onArticleViewChange: async () => {},
};

export const recipeConfig = {
  icons,
  getRecipeSearchData: async () => {},
  recipeCardButtonPropsDefault: {
    className:"recipe-card__favorite",
    Icon: FavoriteIcon,
    isToggle: true,
    viewType: ButtonViewType.icon,
    attributes: { 'aria-label' : 'favorite toggle', name: 'favorite' }
  },
  favorites: [],
  onFavoriteChange: action('favorites were changed'),
  onViewChange: async () => {},
  imageSizes: '(min-width: 768px) 25vw, 50vw',
  viewType: RecipeListViewType.Advanced,
  showFilters: false,
  initialCount: 2,
  recipePerLoad: 2,
  ratingProvider: RatingAndReviewsProvider.inline,
};

const getSearchData = async () => {};
const getSearchSuggestionData = async () => {};
export const content = {
  searchListingContent,
  searchInputContent,
  articleContent,
  tabsContent,
  recipesContent,
  nullResultContent,
};

export const config = { searchInputConfig, recipeConfig, articleConfig };

storiesOf('Generic/Search listing', module)
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
      <SearchListing
        searchQuery={''}
        searchResultTitleLevel={3}
        searchResults={{
          recipeResults,
          searchInputResults,
          articleResults,
        }}
        content={content}
        config={config}
      />
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
    );
  });
