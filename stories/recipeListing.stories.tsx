import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  RecipeListing,
  RecipeListViewType,
} from '../src/components/lib/RecipeListing';
import dataSource from 'src/components/data/recipes.json';

const listing = dataSource.data.allRecipe.edges.map(item => item.node);
const contents = [
  { title: 'Recipe listing Trivial without results' },
  { title: 'Recipe listing Trivial default 4 results' },
  { title: 'Recipe listing Trivial all Recipes' },
  { title: 'Recipe listing Trivial with Favorites' },
  {
    title: 'Recipe listing Base with Load More',
    cta: { label: 'Load More Button' },
  },
  { title: 'Recipe listing Base without results' },
  {
    title: 'Recipe listing Advanced',
    cta: { label: 'Load More Button' },
    optionLabels: {
      PreparationTime: 'Preparation time Test',
      CookingTime: 'Cooking time',
      AverageRating: 'Average rating',
      Newest: 'Newest',
      RecentlyUpdated: 'Recently updated',
      Title: 'Title',
    },
  },
];
storiesOf('Components/Recipe Listing', module)
  .add(
    'Recipe listing Trivial without results',
    () => (
      <RecipeListing
        list={[]}
        viewType={RecipeListViewType.Trivial}
        content={contents[0]}
        titleLevel={1}
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Recipe listing Trivial default 4 results',
    () => (
      <RecipeListing
        // @ts-ignore
        list={listing}
        viewType={RecipeListViewType.Trivial}
        content={contents[1]}
        titleLevel={1}
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Recipe listing Trivial all Recipes',
    () => (
      <RecipeListing
        // @ts-ignore
        list={listing}
        viewType={RecipeListViewType.Trivial}
        content={contents[2]}
        titleLevel={1}
        initialCount={0}
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Recipe listing Trivial with Favorites',
    () => (
      <RecipeListing
        // @ts-ignore
        list={listing}
        viewType={RecipeListViewType.Trivial}
        content={contents[3]}
        withFavorite
        favorites={[]}
        onFavoriteChange={action('favorites were changed')}
        titleLevel={1}
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Recipe listing Base with Load More',
    () => (
      <RecipeListing
        // @ts-ignore
        list={listing}
        viewType={RecipeListViewType.Base}
        content={contents[4]}
        withFavorite
        favorites={[]}
        onFavoriteChange={action('favorites were changed')}
        titleLevel={1}
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Recipe listing Base without results',
    () => (
      <RecipeListing
        list={[]}
        viewType={RecipeListViewType.Base}
        content={contents[5]}
        titleLevel={1}
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Recipe listing Advanced',
    () => (
      <RecipeListing
        // @ts-ignore
        list={listing}
        viewType={RecipeListViewType.Advanced}
        favorites={[]}
        withFavorite
        content={contents[6]}
        titleLevel={1}
      />
    ),
    {
      info: { inline: false },
    }
  );
