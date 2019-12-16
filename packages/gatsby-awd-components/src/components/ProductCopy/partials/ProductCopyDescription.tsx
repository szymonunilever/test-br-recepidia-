import cx from 'classnames';
import React from 'react';
import { TagName, Text } from '../../Text';
import { ProductCopyDescriptionProps } from './models';
import theme from './ProductCopyDescription.module.scss';

export const ProductCopyDescription = ({
  className,
  description,
}: ProductCopyDescriptionProps) => {
  const classWrapper = cx(theme.productCopyDescription, className);
  return <Text tag={TagName.p} text={description} className={classWrapper} />;
};
