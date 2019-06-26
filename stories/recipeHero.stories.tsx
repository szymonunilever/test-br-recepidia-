import React from 'react';
import { storiesOf } from '@storybook/react';
// import RecipeHeroData from '../src/components/data/recipe.json';
import RecipeHero from '../src/components/lib/components/RecipeHero';
import { RecipeHeroProps } from '../src/components/lib/components/RecipeHero/models';

const page = {
  maxWidth: '1090px',
};

const config: RecipeHeroProps = {
  content: {
    title: 'Slow Cooker Honey Mustard Chicken',
    description: 'This potato salad recipe is a breeze to whip up. It’s a classic that everyone will love at parties or as a dinnertime side.',
  },
  className: 'custom-class',
  viewType: 'default',
};

storiesOf('Components/RecipeHero/defaultView', module).add('Default', () => {
  const newConfig = {
    ...config,
    content: {
      ...config.content,
      subtitle: undefined,
    },
  };

  return (
    <div style={page}>
      <RecipeHero {...newConfig} />
    </div>
  );
});
