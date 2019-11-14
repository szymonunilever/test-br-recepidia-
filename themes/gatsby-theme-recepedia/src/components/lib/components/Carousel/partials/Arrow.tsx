import React from 'react';
import { ArrowProps } from './models';

const Arrow = ({ direction = 'right', clickFunction, icon }: ArrowProps) => {
  return (
    <button
      className={`slide-arrow ${direction}`}
      onClick={clickFunction}
      aria-label={direction}
    >
      {icon}
    </button>
  );
};

export default Arrow;
