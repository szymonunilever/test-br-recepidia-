import React from 'react';
import { TabProps } from './models';
import theme from './Tab.module.scss';
import cx from 'classnames';

export const Tab = ({ className, active = false, children = [] }: TabProps) => {
  const classWrapper = cx(theme.tabBody, className);
  return (
    <div className={classWrapper} hidden={!active}>
      {children}
    </div>
  );
};
