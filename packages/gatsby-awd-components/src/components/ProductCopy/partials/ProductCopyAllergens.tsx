import cx from 'classnames';
import React from 'react';
import { TagName, Text } from '../../Text';
import { ProductCopyAllergensProps } from './models';
import theme from './ProductCopyAllergens.module.scss';
import {getComponentDataAttrs} from '../../../utils';

export const ProductCopyAllergens = ({
  className,
  title,
  subtitle,
  titleLevel = 2,
  allergy,
}: ProductCopyAllergensProps) => {
  const classWrapper = cx(theme.productCopyAllergens, className);
  // @ts-ignore
  const titleTag = TagName[`h${titleLevel}`];
  // @ts-ignore
  const subtitleTag = TagName[`h${titleLevel + 1}`];
  const Title = title ? (
    <Text
      className={cx(
        theme.productCopyAllergens__title,
        'product-copy-allergens__title',
      )}
      tag={titleTag}
      text={title}
    />
  ) : null;

  const Subtitle = subtitle ? (
    <Text
      className={cx(
        theme.productCopyAllergens__subtitle,
        'product-copy-allergens__subtitle'
      )}
      tag={subtitleTag}
      text={subtitle}
    />
  ) : null;

  return (
    <div
      className={classWrapper}
      {...getComponentDataAttrs('productCopyAllergens')}
    >
      {Title}
      {Subtitle}
      <div className={cx(theme.productCopyAllergens__data, 'product-allergens')}>
        {allergy.join(', ')}
      </div>
    </div>
  );
};
