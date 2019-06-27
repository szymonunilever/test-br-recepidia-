import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  RecipeListing,
  RecipeListViewType,
} from '../src/components/lib/components/RecipeListing';
import { RecipeItem } from '../src/components/lib/components/RecipeListing/partials/models';
import PageListing from '../src/components/lib/components/PageListing/PageListing';
import recipes from 'src/components/data/recipes.json';
import pages from 'src/components/data/pageListing.json';
import { PageListingViewTypes } from './components/lib/components/PageListing/models';

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
        carouselConfig={{
          breakpoints: [
            {
              width: 1366,
              switchElementsBelowBreakpoint: 1,
              switchElementsAfterBreakpoint: 2,
              visibleElementsBelowBreakpoint: 2,
              visibleElementsAboveBreakpoint: 4,
            },
          ],
        }}
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
        viewType={PageListingViewTypes.carousel}
        initialCount={4}
        carouselConfig={{
          breakpoints: [
            {
              width: 1366,
              switchElementsBelowBreakpoint: 1,
              switchElementsAfterBreakpoint: 2,
              visibleElementsBelowBreakpoint: 2,
              visibleElementsAboveBreakpoint: 4,
            },
          ],
        }}
      />
    ),
    { info: { inline: false } }
  );
