import React from 'react';
import { RecipeNutrientsBodyProps } from './models';
import { RecipeNurientsTable, RecipeNurientsTable100 } from './index';
import theme from './RecipeNutientsBody.module.scss';
import cx from 'classnames';

export const RecipeNutrientsBody = ({
  className,
  content: { titlePer100, titlePerServing, titleTotal },
  recipe,
}: RecipeNutrientsBodyProps) => {
  const classWrapper = cx(theme.recipeNutrientsBody, className);
  return (
    <div className={classWrapper}>
      {recipe.nutrientsPer100g && (
        <RecipeNurientsTable100
          label={titlePer100}
          nutrients={recipe.nutrientsPer100g}
        />
      )}
      <RecipeNurientsTable
        labelServing={titlePerServing}
        labelTotal={titleTotal}
        nutrients={recipe.nutrients}
        nutrientsServing={recipe.nutrientsPerServing}
      />
    </div>
  );
};
