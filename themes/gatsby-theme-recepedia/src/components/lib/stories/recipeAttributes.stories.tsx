import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  RecipeAttributeIcons,
  RecipeAttributes,
  RecipeAttributesKeys,
} from '../index';
import dataSource from './mocks/recipe.json';
import { ReactComponent as RecipeClock } from './svgs/inline/recipe-clock.svg';
import { ReactComponent as RecipeDifficulty } from './svgs/inline/recipe-difficulty.svg';
import { ReactComponent as RecipePeople } from './svgs/inline/recipe-people.svg';
import { ReactComponent as RecipeKnife } from './svgs/inline/recipe-chop.svg';
import content from './mocks/recipeAttributes.json';

const config: RecipeAttributesKeys[] = [
  RecipeAttributesKeys.serves,
  RecipeAttributesKeys.totalTime,
  RecipeAttributesKeys.preperationTime,
  RecipeAttributesKeys.difficulties,
];

const recipeData = {
  ...dataSource,
  creationTime: new Date(dataSource.creationTime),
};

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
      //@ts-ignore
      recipe={recipeData}
      visible={config}
      icons={icons}
      content={content}
    />
  ),
  { inline: false }
);
