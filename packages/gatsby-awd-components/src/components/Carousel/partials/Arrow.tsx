import React, { FunctionComponent } from 'react';
import { iconNormalize } from '../../../utils';
import { ArrowProps } from './models';
import theme from './Arrow.module.scss';
import cx from 'classnames';

const Arrow: FunctionComponent<ArrowProps> = ({
  direction = 'right',
  clickFunction,
  icon,
}) => {
  return (
    <button
      className={cx(theme.slideArrow, `slide-arrow ${direction}`)}
      onClick={clickFunction}
      aria-label={direction}
    >
      {iconNormalize(icon)}
    </button>
  );
};

export default Arrow;
