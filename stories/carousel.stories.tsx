import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  PageListing,
  RecipeListing,
  RecipeListViewType,
} from '../src/components/lib';
import recipes from 'src/components/data/recipes.json';
import pages from 'src/components/data/pageListing.json';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import { PageListingViewTypes } from 'src/components/lib';

const recipesList: Internal.Recipe[] = recipes.data.allRecipe.edges.map(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (item: { node: Internal.Recipe | any }) => item.node
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
      <div className="container">
        <RecipeListing
          list={recipesList}
          viewType={RecipeListViewType.Carousel}
          className="recipe-list--carousel"
          content={recipesContents}
          titleLevel={3}
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
            arrowIcon: <ArrowIcon />,
          }}
          imageSizes={'(min-width: 768px) 25vw, 50vw'}
        />
      </div>
    ),
    {
      info: { inline: false },
    }
  )
  .add('Pages Carousel default', () => (
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
  ));
