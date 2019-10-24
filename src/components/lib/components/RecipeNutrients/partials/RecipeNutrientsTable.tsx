import React from 'react';
import { RecipeNutrientsTableProps } from './models';
import theme from './RecipeNutrientsTable.module.scss';
import cx from 'classnames';

export const RecipeNurientsTable = ({
  className,
  labelServing,
  labelTotal,
  nutrients,
  nutrientsServing,
}: RecipeNutrientsTableProps) => {
  const classWrapper = cx(theme.recipeTable, className);
  return (
    <table className={classWrapper}>
      <thead>
        <tr>
          <th />
          {nutrientsServing && nutrientsServing.length && (
            <th>{labelServing}</th>
          )}
          <th>{labelTotal}</th>
        </tr>
      </thead>
      <tbody>
        {nutrients
          ? nutrients.map((item, key) => (
              <tr key={key}>
                <td>{item.displayUnit}</td>
                {nutrientsServing && nutrientsServing.length && (
                  <td>{nutrientsServing[key].rawValue}</td>
                )}
                <td>{item.rawValue}</td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};
