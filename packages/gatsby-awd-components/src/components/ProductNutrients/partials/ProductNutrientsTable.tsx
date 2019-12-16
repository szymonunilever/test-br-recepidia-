import React from 'react';
import cx from 'classnames';
import { ProductNutrientsTableProps } from './models';
import theme from './ProductNutrientsTable.module.scss';

const ProductNutrientsTable = ({
  nutritionFacts,
  content: {tableTitlePer100, tableTitleNutrient}
}: ProductNutrientsTableProps) => {
  const classNames = cx(
    theme.productNutrientsTable,
    'product-nutrients-table'
  );

  return (
    <table className={classNames}>
      <thead>
      <tr>
        <th>{tableTitleNutrient}</th>
        <th>{tableTitlePer100}</th>
      </tr>
      </thead>
      <tbody>
      {nutritionFacts ? nutritionFacts.map((item, i) => (
        <tr key={i}>
          <td>{item.name}</td>
          <td>{item.rawValue} {item.displayUnit}</td>
        </tr>
      )) : null}
      </tbody>
    </table>
  )
};

export default ProductNutrientsTable;
