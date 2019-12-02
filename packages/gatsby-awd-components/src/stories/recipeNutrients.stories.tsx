import { storiesOf } from '@storybook/react';
import React from 'react';
import dataRecipe from '../mocks/recipe.json';
import { ReactComponent as CloseButton } from 'src/svgs/inline/x-mark.svg';
import { RecipeNutrients, RecipeNutrientsViewType } from '../index';

export const content: AppContent.RecipeNutrientsContent = {
  buttonLabel: { label: 'Nutrients' },
  titleTotal: 'Total',
  titlePer100: 'Per 100',
  titlePerServing: 'Amount per Serving',
};
export const recipe = {
  ...dataRecipe,
  creationTime: new Date(dataRecipe.creationTime),
};
storiesOf('Recipe related/Recipe Nutrients', module)
  .add(
    'Base',
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
    'With Button',
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
