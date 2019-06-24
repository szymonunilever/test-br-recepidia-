import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  RecipeAttributeIcons,
  RecipeAttributes,
  RecipeAttributesKeys,
} from '../src/components/lib/components/RecipeAttributes';
import dataSource from 'src/components/data/recipe.json';
import RecipeClock from 'src/svgs/inline/recipe-clock.svg';
import RecipeDifficulty from 'src/svgs/inline/recipe-difficulty.svg';
import RecipePeople from 'src/svgs/inline/recipe-people.svg';
import RecipeKnife from 'src/svgs/inline/recope-chop.svg';
const content: AppContent.RecipeAttributes.Content = {
  labels: {
    preparationTime: {
      title: 'Prep time',
      units: 'min',
      unitsPlural: 'mins',
    },
    totalTime: {
      title: 'Total time',
      units: 'min',
      unitsPlural: 'mins',
    },
    serves: {
      title: 'Feeds',
      units: 'person',
      unitsPlural: 'people',
    },
    difficulties: {
      title: 'Difficulty',
    },
  },
};

const config: RecipeAttributesKeys[] = [
  RecipeAttributesKeys.serves,
  RecipeAttributesKeys.totalTime,
  RecipeAttributesKeys.preparationTime,
  RecipeAttributesKeys.difficulties,
];

const recipeData: RMSData.Recipe = Object.assign(dataSource, {
  creationTime: new Date(dataSource.creationTime),
});

const icons: RecipeAttributeIcons = {
  preparationTime: RecipeKnife,
  totalTime: RecipeClock,
  serves: RecipePeople,
  difficulties: RecipeDifficulty,
};

storiesOf('Components/Recipe Attributes', module).add(
  'Default View',
  () => (
    <RecipeAttributes
      recipe={recipeData}
      visible={config}
      icons={icons}
      content={content}
    />
  ),
  { inline: false }
);