import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  RecipeListing,
  RecipeListViewType,
} from '../src/components/lib/RecipeListing';
import { RecipeItem } from '../src/components/lib/RecipeListing/partials/models';
import PageListing from '../src/components/lib/PageListing/PageListing';
import recipes from 'src/components/data/recipes.json';
import pages from 'src/components/data/pageListing.json';

const recipesList: RecipeItem[] = recipes.data.allRecipe.edges.map(
  (item: { node: RecipeItem | any }) => item.node
);
const recipesContents = {
  title: 'Recipe carousel default',
  nullResult: {
    title: 'Oops! No results',
    subtitle: '',
    textList: [],
  },
};
const pagesContents = {
  title: 'Custom title text',
  subtitle: 'Custom subtitle',
  cta: {
    label: 'Custom button text',
  },
};
storiesOf('Components/Carousel', module)
  .add(
    'Recipes Carousel default',
    () => (
      <RecipeListing
        list={recipesList}
        viewType={RecipeListViewType.Carousel}
        content={recipesContents}
        titleLevel={1}
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Pages Carousel default',
    () => (
      <PageListing
        list={pages}
        content={pagesContents}
        viewType="carousel"
        initialCount={4}
      />
    ),
    { info: { inline: false } }
  )
  .add(
    'Recipes Carousel with thumbnails',
    () => (
      <RecipeListing
        list={recipesList}
        viewType={RecipeListViewType.Carousel}
        content={recipesContents}
        titleLevel={1}
        showThumbnails={true}
      />
    ),
    { info: { inline: false } }
  )
  .add(
    'Pages Carousel with thumbnails',
    () => (
      <PageListing
        list={pages}
        content={pagesContents}
        viewType="carousel"
        initialCount={4}
        showThumbnails={true}
      />
    ),
    { info: { inline: false } }
  );
