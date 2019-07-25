import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  RecipeAttributeIcons,
  RecipeAttributes,
  RecipeAttributesKeys,
} from 'src/components/lib/components/RecipeAttributes';
import dataSource from 'src/components/data/recipe.json';
import RecipeClock from 'src/svgs/inline/recipe-clock.svg';
import RecipeDifficulty from 'src/svgs/inline/recipe-difficulty.svg';
import RecipePeople from 'src/svgs/inline/recipe-people.svg';
import RecipeKnife from 'src/svgs/inline/recipe-chop.svg';
import content from 'src/components/data/recipeAttributes.json';

const config: RecipeAttributesKeys[] = [
  RecipeAttributesKeys.serves,
  RecipeAttributesKeys.totalTime,
  RecipeAttributesKeys.preparationTime,
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
