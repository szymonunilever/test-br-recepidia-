import { storiesOf } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';

import useElasticSearch from 'src/utils';
import SearchListing from 'src/components/lib/components/SearchListing';

import CloseSvg from 'src/svgs/inline/x-mark.svg';
import PlaceholderIcon from '../src/svgs/inline/placeholder.svg';
import FavoriteIcon from 'src/svgs/inline/favorite.svg';
import { RecipeListViewType } from 'src/components/lib/components/RecipeListing';

const searchInputContent: AppContent.SearchInput.Content = {
  title: 'Looking for something?',
};

const tabsContent: AppContent.Tabs.Content = {
  tabs: [
    {
      title: 'All',
      view: 'all',
    },
    // {
    //   title: 'Articles',
    //   view: 'articles',
    // },
    {
      title: 'Recipes',
      view: 'recipes',
    },
  ],
};

const recipesContent = [
  {
    title: 'Recipe listing Trivial without results',
    nullResult: {
      title: 'Oops! No results',
      subtitle: 'Maybe try the following:',
      textList: [
        `Don't use too many filters at once`,
        `Try using only filters`,
      ],
    },
  },
  {
    title: 'Recipe listing Trivial default 4 results',
    nullResult: {
      title: 'Oops! No results',
      subtitle: 'Maybe try the following:',
      textList: [
        `Don't use too many filters at once`,
        `Try using only filters`,
      ],
    },
  },
  {
    title: 'Recipe listing Trivial all Recipes',
    nullResult: {
      title: 'Oops! No results',
      subtitle: 'Maybe try the following:',
      textList: [
        `Don't use too many filters at once`,
        `Try using only filters`,
      ],
    },
  },
  {
    title: 'Recipe listing Trivial with Favorites',
    nullResult: {
      title: 'Oops! No results',
      subtitle: 'Maybe try the following:',
      textList: [
        `Don't use too many filters at once`,
        `Try using only filters`,
      ],
    },
  },
  {
    title: 'Recipe listing Base with Load More',
    cta: { label: 'Load More Button' },
    nullResult: {
      title: 'Oops! No results',
      subtitle: 'Maybe try the following:',
      textList: [
        `Don't use too many filters at once`,
        `Try using only filters`,
      ],
    },
  },
  {
    title: 'Recipe listing Base without results',
    nullResult: {
      title: 'Oops! No results',
      subtitle: 'Maybe try the following:',
      textList: [
        `Don't use too many filters at once`,
        `Try using only filters`,
      ],
    },
  },
  {
    title: 'Recipe listing Advanced',
    resultLabel: 'recipe',
    resultLabelPlural: 'recipes',
    sortSelectPlaceholder: 'Sort By',
    filtersCta: {
      resetLabel: { label: 'Reset filters' },
      applyLabel: { label: 'Apply filters' },
    },
    cta: { label: 'Load More Button' },
    nullResult: {
      title: 'Oops! No results',
      subtitle: 'Maybe try the following:',
      textList: [
        `Don't use too many filters at once`,
        `Try using only filters`,
      ],
    },
    optionLabels: {
      preparationTime: 'Preparation time Test',
      cookingTime: 'Cooking time',
      averageRating: 'Average rating',
      newest: 'newest',
      recentlyUpdated: 'Recently updated',
      title: 'title',
    },
  },
];

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

const searchInputConfig = {
  searchResultsCount: 8,
  labelIcon: <PlaceholderIcon />,
  buttonResetIcon: <CloseSvg />,
  buttonSubmitIcon: <PlaceholderIcon />,
  onSubmit: () => {},
};

const recipesConfig = {
  viewType: RecipeListViewType.Base,
  FavoriteIcon: FavoriteIcon,
  withFavorite: true,
  initialCount: 2,
  recipePerLoad: 2,
  favorites: [],
  onFavoriteChange: action('favorites were changed'),
};

storiesOf('Components/Search listing', module).add('With results', () => {
  const getSearchData = (
    searchQuery: string,
    { from = 0, size = undefined }
  ) => {
    const searchBody = {
      from,
      size,
      query: {
        /*eslint-disable */
        multi_match: {
          query: `${searchQuery}`,
          fields: ['title', 'description', 'tagGroups.tags.name'],
        },
        /*eslint-enable */
      },
    };

    return useElasticSearch<Internal.Recipe>(searchBody);
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <SearchListing
        searchResultTitleLevel={3}
        getSearchData={getSearchData}
        content={{
          searchListingContent,
          searchInputContent,
          tabsContent,
          recipesContent: recipesContent[4],
          nullResultContent,
        }}
        config={{ searchInputConfig, recipesConfig }}
      />
    </div>
  );
});
