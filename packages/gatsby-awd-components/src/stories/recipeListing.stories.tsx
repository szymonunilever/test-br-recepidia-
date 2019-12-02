import { storiesOf } from '@storybook/react';
import React from 'react';
import { RecipeListing } from '../index';
import { recipeListingPropsVariants } from '../mocks/RecipeListing';
storiesOf('Recipe related/Recipe Listing', module)
  .add(
    'Trivial without results',
    () => <RecipeListing {...recipeListingPropsVariants.trivialNoResults} />,
    {
      info: { inline: false },
    }
  )
  .add(
    'Trivial',
    () => <RecipeListing {...recipeListingPropsVariants.trivial} />,
    {
      info: { inline: false },
    }
  )
  .add(
    'Trivial with Favorites',
    () => (
      <RecipeListing {...recipeListingPropsVariants.trivialWithFavorites} />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Base with Load More',
    () => <RecipeListing {...recipeListingPropsVariants.base} />,
    {
      info: { inline: false },
    }
  )
  .add(
    'Base without results',
    () => <RecipeListing {...recipeListingPropsVariants.baseNoResults} />,
    {
      info: { inline: false },
    }
  )
  .add(
    'Advanced',
    () => (
      <div className="container">
        <RecipeListing {...recipeListingPropsVariants.advanced} />
      </div>
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Recipes Carousel default',
    () => (
      <RecipeListing {...recipeListingPropsVariants.carousel} />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Recipes Carousel with Favorites',
    () => (
      <RecipeListing {...recipeListingPropsVariants.carouselWithFavorites} />
    ),
    {
      info: { inline: false },
    }
  );
