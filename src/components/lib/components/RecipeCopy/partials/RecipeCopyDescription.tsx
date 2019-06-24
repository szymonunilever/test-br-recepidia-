import cx from 'classnames';
import React from 'react';
import { TagName, Text } from '../../Text';
import { RecipeCopyDescriptionProps } from './models';
import theme from './RecipeCopyDescription.module.scss';

export const RecipeCopyDescription = ({
  className,
  description,
}: RecipeCopyDescriptionProps) => {
  const classWrapper = cx(theme.recipeCopyDescription, className);
  return <Text tag={TagName.p} text={description} className={classWrapper} />;
};
