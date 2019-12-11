import cx from 'classnames';
import React from 'react';
import { TagName, Text } from '../../Text';
import { ProductCopyTitleProps } from './models';
import theme from './ProductCopyTitle.module.scss';

export const ProductCopyTitle = ({
  className,
  title,
  titleLevel = 1,
}: ProductCopyTitleProps) => {
  const classWrapper = cx(theme.productCopyTitle, className);
  // @ts-ignore
  const level = TagName[`h${titleLevel}`];
  return <Text tag={level} text={title} className={classWrapper} />;
};
