import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
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
  const dictionaryRaw = useStaticQuery(graphql`
        {
          dictionary {
            content
          }
        }
      `);
  const dictionary = JSON.parse(dictionaryRaw.dictionary.content);
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
                <td>{item.name in dictionary ? dictionary[item.name] : item.displayUnit}</td>
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
