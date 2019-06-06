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
    'Recipe listing Trivial default 4 results',
    () => (
      <RecipeListing
        list={listing}
        viewType={RecipeListViewType.Trivial}
        title="Test"
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
        title="Test"
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
        title="Test"
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
        title="Test"
        withFavorite
        favorites={[]}
        onFavoriteChange={action('favorites were changed')}
        titleLevel={1}
      />
    ),
    {
      info: { inline: false },
    }
  );
