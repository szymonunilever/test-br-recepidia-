import React from 'react';
import { LoaderProps } from './models';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';
import theme from './Loader.module.scss';
import cx from 'classnames';

const Loader = ({ isLoading = false, children }: LoaderProps) => {
  return isLoading ? (
    <div
      className={cx(theme.loader, 'loader')}
      {...getComponentDataAttrs('loader')}
    >
      { children }
    </div>
  ) : null;
};

export default Loader;
