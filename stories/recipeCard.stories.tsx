import { storiesOf } from '@storybook/react';
import React from 'react';
import { RecipeCard } from '../src/components/lib/RecipeListing/RecipeCard';
import imageItem from 'src/components/data/localImage.json';

storiesOf('Components/RecipeCard', module)
  .add(
    'default with favorite',
    () => (
      <RecipeCard
        title="Test recipe card"
        enableSelectFavorite={true}
        imgObject={imageItem}
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
        imgObject={imageItem}
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
        imgObject={imageItem}
        slug="/"
        inFavorite
      />
    ),
    {
      info: { inline: false },
    }
  );
