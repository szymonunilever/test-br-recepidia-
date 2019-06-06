import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import React from 'react';
import {
  RecipeListing,
  RecipeListViewType,
} from '../src/components/lib/RecipeListing';
import dataSource from 'src/components/data/recipes.json';

const listing = dataSource.data.allRecipe.edges.map(item => item.node);

storiesOf('Components/Recipe Listing', module)
  .add(
    'Recipe listing Trivial without results',
    () => (
      <RecipeListing
        list={[]}
        viewType={RecipeListViewType.Trivial}
        title="Recipe listing Trivial without results"
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
        list={listing}
        viewType={RecipeListViewType.Trivial}
        title="Recipe listing Trivial default 4 results"
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
        list={listing}
        viewType={RecipeListViewType.Trivial}
        title="Recipe listing Trivial all Recipes"
        titleLevel={1}
        recipeCount={0}
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
        list={listing}
        viewType={RecipeListViewType.Trivial}
        title="Recipe listing Trivial with Favorites"
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
        list={listing}
        viewType={RecipeListViewType.Base}
        title="Recipe listing Base with Load More"
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
        title="Recipe listing Base without results"
        titleLevel={1}
      />
    ),
    {
      info: { inline: false },
    }
  );
