import React from 'react';
import { RecipeNutrientsTable100Props } from './models';
import theme from './RecipeNutrientsTable100.module.scss';
import cx from 'classnames';

export const RecipeNurientsTable100 = ({
  className,
  label,
  nutrients,
}: RecipeNutrientsTable100Props) => {
  const classWrapper = cx(theme.recipeTable100, className);
  return (
    <table className={classWrapper}>
      <thead>
        <tr>
          <th />
          <th>{label}</th>
        </tr>
      </thead>
      <tbody>
        {nutrients
          ? nutrients.map((item, key) => (
              <tr key={key}>
                <td>{item.displayUnit}</td>
                <td>{item.quantity}</td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};
