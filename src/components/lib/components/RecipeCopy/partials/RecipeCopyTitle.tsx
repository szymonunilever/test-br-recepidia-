import cx from 'classnames';
import React from 'react';
import { TagName, Text } from '../../Text';
import { RecipeCopyTitleProps } from './models';
import theme from './RecipeCopyTitle.module.scss';

export const RecipeCopyTitle = ({
  className,
  title,
  titleLevel = 1,
}: RecipeCopyTitleProps) => {
  const classWrapper = cx(theme.recipeCopyTitle, className);
  // @ts-ignore
  const level = TagName[`h${titleLevel}`];
  return <Text tag={level} text={title} className={classWrapper} />;
};
