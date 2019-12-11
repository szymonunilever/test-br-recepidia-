import cx from 'classnames';
import React from 'react';
import { TagName, Text } from '../../Text';
import { ProductCopyIngredientsProps } from './models';
import theme from './ProductCopyIngredients.module.scss';
import getComponentDataAttrs from '../../../utils/getComponentDataAttrs';

export const ProductCopyIngredients = ({
  className,
  title,
  subtitle,
  ingredients,
  titleLevel = 2,
}: ProductCopyIngredientsProps) => {
  const classWrapper = cx(theme.productCopyIngredients, className);
  // @ts-ignore
  const titleTag = TagName[`h${titleLevel}`];
  // @ts-ignore
  const subtitleTag = TagName[`h${titleLevel + 1}`];
  const titleString = title ? (
    <Text
      className={cx(
        theme.productCopyIngredients__title,
        'product-copy-ingredients__title'
      )}
      tag={titleTag}
      text={title}
    />
  ) : null;
  const subtitleString = subtitle ? (
    <Text
      className={cx(
        theme.productCopyIngredients__subtitle,
        'product-copy-ingredients__subtitle'
      )}
      tag={subtitleTag}
      text={subtitle}
    />
  ) : null;

  return (
    <div
      className={classWrapper}
      {...getComponentDataAttrs('productCopyIngredients')}
    >
      {titleString}
      {subtitleString}
      <div className={cx(theme.productIngredients, 'product-ingredients')}>
        {ingredients.join(', ')}
      </div>
    </div>
  );
};
