import cx from 'classnames';
import React from 'react';
import { ProductCopyProps, ProductCopyViewType } from './models';
import {
  ProductCopyDescription,
  ProductCopyTitle,
  ProductCopyIngredients,
  ProductCopyAllergens,
} from './partials';
import theme from './ProductCopy.module.scss';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

export const ProductCopy = ({
  className,
  content,
  content: { title, subtitle },
  product,
  titleLevel = 1,
  viewType,
}: ProductCopyProps) => {
  const classWrapper = cx(theme.productCopy, className);
  let view: JSX.Element | undefined | null;
  switch (viewType) {
    case ProductCopyViewType.Title:
      view = <ProductCopyTitle title={product.productName} titleLevel={titleLevel}/>;
      break;
    case ProductCopyViewType.Description:
      view = <ProductCopyDescription description={product.longPageDescription}/>;
      break;
    case ProductCopyViewType.Ingredients:
      view = (
        <ProductCopyIngredients
          ingredients={product.ingredients}
          titleLevel={titleLevel}
          title={title}
          subtitle={subtitle}
        />
      );
      break;
    case ProductCopyViewType.Allergy:
      view = (
        <ProductCopyAllergens
          allergy={product.allergy}
          titleLevel={titleLevel}
          title={title}
          subtitle={subtitle}
        />
      );
      break;
  }
  return (
    <div
      className={classWrapper}
      {...getComponentDataAttrs('productCopy', content)}
    >
      {view}
    </div>
  );
};

export default ProductCopy;
