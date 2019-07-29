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
          <th>{labelServing}</th>
          <th>{labelTotal}</th>
        </tr>
      </thead>
      <tbody>
        {nutrients
          ? nutrients.map((item, key) => (
              <tr key={key}>
                <td>{item.displayUnit}</td>
                <td>
                  {nutrientsServing[key].rawValue} {item.unit}
                </td>
                <td>
                  {item.rawValue} {item.unit}
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};
