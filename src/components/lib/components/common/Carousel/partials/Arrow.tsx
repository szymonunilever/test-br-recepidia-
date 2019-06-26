import React from 'react';
import { ArrowProps } from './models';

const Arrow = ({ direction = 'right', clickFunction, icon }: ArrowProps) => {
  return (
    <div className={`slide-arrow ${direction}`} onClick={clickFunction}>
      {icon}
    </div>
  );
};

export default Arrow;
