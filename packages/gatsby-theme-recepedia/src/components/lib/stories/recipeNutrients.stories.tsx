import { storiesOf } from '@storybook/react';
import React from 'react';
import dataRecipe from './mocks/recipe.json';
import { ReactComponent as CloseButton } from './svgs/inline/x-mark.svg';
import { RecipeNutrients, RecipeNutrientsViewType } from '../index';

const content: AppContent.RecipeNutrientsContent = {
  buttonLabel: { label: 'Nutrients' },
  titleTotal: 'Total',
  titlePer100: 'Per 100',
  titlePerServing: 'Amount per Serving',
};
const recipe = {
  ...dataRecipe,
  creationTime: new Date(dataRecipe.creationTime),
};
storiesOf('Components/Recipe Nutrients', module)
  .add(
    'Recipe Nutrients Base',
    () => (
      <RecipeNutrients
        //@ts-ignore
        recipe={recipe}
        viewType={RecipeNutrientsViewType.Base}
        content={content}
      />
    ),
    { inline: false }
  )
  .add(
    'Recipe Nutrients With Button',
    () => (
      <RecipeNutrients
        //@ts-ignore
        recipe={recipe}
        viewType={RecipeNutrientsViewType.WithAction}
        CloseButton={CloseButton}
        content={content}
      />
    ),
    { inline: false }
  );
