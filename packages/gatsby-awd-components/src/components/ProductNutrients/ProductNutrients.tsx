import React from 'react';
import cx from 'classnames';
import { ProductNutrientsProps } from './models';
import theme from './ProductNutrients.module.scss';
import ProductNutrientsTable from './partials';
import { TagName, Text } from '../Text';

const ProductNutrients = ({
  content,
  nutritionFacts,
  titleLevel = 2,
  className
}: ProductNutrientsProps) => {
  const classNames = cx(
    theme.productNutrients,
    className,
    'product-nutrients',
  );

  const titleString = content.title ? (
    <Text
      // @ts-ignore
      tag={TagName[titleLevel ? `h${titleLevel}` : `div`]}
      className="product-nutrients__title"
      text={content.title}
    />
  ) : null;

  return (
    <div className={classNames}>
      {titleString}
      <ProductNutrientsTable {...{nutritionFacts, content}} />
    </div>
  );
};

export default ProductNutrients;
