import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { ProductNutrientsTableProps } from './models';
import theme from './ProductNutrientsTable.module.scss';
import { graphql, useStaticQuery } from 'gatsby';

const ProductNutrientsTable = ({
  nutritionFacts,
  content: {tableTitlePerPortion}
}: ProductNutrientsTableProps) => {
  nutritionFacts = JSON.parse(nutritionFacts);
  const classNames = cx(
    theme.productNutrientsTable,
    'product-nutrients-table'
  );

  const [nFacts, setNFacts] = useState();
  const [servingSize, setServingSize] = useState();
  const [servingsPerContainer, setServingsPerContainer] = useState();
  const dictionaryRaw = useStaticQuery(graphql`
        {
          dictionary {
            content
          }
        }
      `);
  const dictionary = JSON.parse(dictionaryRaw.dictionary.content);

  useEffect(() => {
    if (nutritionFacts.servingSize) {
      setServingSize(nutritionFacts.servingSize);
      delete nutritionFacts.servingSize
    }
    if (nutritionFacts.servingsPerContainer) {
      setServingsPerContainer(nutritionFacts.servingsPerContainer);
      delete nutritionFacts.servingsPerContainer
    }
    // @ts-ignore
    setNFacts(Object.entries(nutritionFacts).map(([key, value]) => {
      if (value) {
        return {key,value}
      }
    }).filter((item: any) => item));
  }, []);

  return (
    <table className={classNames}>
      <thead>
      <tr>
        <th>{servingSize} {servingsPerContainer ? (<span>({servingsPerContainer})</span>) : null}</th>
        <th>{tableTitlePerPortion}</th>
      </tr>
      </thead>
      <tbody>
      {nFacts ? nFacts.map((item: any, i: number) => (
        <tr key={i}>
          <td>{dictionary[item.key]}</td>
          <td>{item.value}</td>
        </tr>
      )) : null}
      </tbody>
    </table>
  )
};

export default ProductNutrientsTable;
