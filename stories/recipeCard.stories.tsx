import { storiesOf } from '@storybook/react';
import React from 'react';
import { RecipeCard } from '../src/components/lib/RecipeListing/RecipeCard';

storiesOf('Components/RecipeCard', module)
  .add(
    'default with favorite',
    () => (
      <RecipeCard
        title="Test recipe card"
        enableSelectFavorite={true}
        recipeImgPath="/favicon.ico"
        slug="/"
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'default without favorite',
    () => (
      <RecipeCard
        title="Test recipe card"
        enableSelectFavorite={false}
        recipeImgPath="/favicon.ico"
        slug="/"
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'with preselected favorite',
    () => (
      <RecipeCard
        title="Test recipe card"
        enableSelectFavorite={true}
        recipeImgPath="/favicon.ico"
        slug="/"
        inFavorite
      />
    ),
    {
      info: { inline: false },
    }
  );
