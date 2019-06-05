import { storiesOf } from '@storybook/react';
import React from 'react';
import { RecipeCard } from '../src/components/lib/RecipeListing/RecipeCard';
import imageItem from 'src/components/data/localImage.json';
const image = JSON.parse(JSON.stringify(imageItem));
storiesOf('Components/RecipeCard', module)
  .add(
    'default with favorite',
    () => (
      <RecipeCard
        title="Test recipe card"
        enableSelectFavorite={true}
        imgObject={image}
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
        imgObject={image}
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
        imgObject={image}
        slug="/"
        inFavorite
      />
    ),
    {
      info: { inline: false },
    }
  );
