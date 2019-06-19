import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  RecipeAttributes,
  RecipeAttributesKeys,
} from '../src/components/lib/RecipeAttributes';
import dataSource from 'src/components/data/recipe.json';
const content: AppContent.RecipeAttributes.Content = {
  labels: {
    preparationTime: {
      title: 'Prep time',
      units: 'min',
      unitsPlural: 'mins',
    },
    cookingTime: {
      title: 'Cooking time',
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
  RecipeAttributesKeys.preparationTime,
  RecipeAttributesKeys.cookingTime,
  RecipeAttributesKeys.serves,
  RecipeAttributesKeys.difficulties,
];
//@ts-ignore
const recipeData: RMSData.Recipe = Object.assign(dataSource, {
  creationTime: new Date(dataSource.creationTime),
});

storiesOf('Components/Recipe Attributes', module).add(
  'Default View',
  () => <RecipeAttributes recipe={recipeData} content={content} />,
  { inline: false }
);
