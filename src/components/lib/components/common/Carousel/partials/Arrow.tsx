import React from 'react';
import { ArrowProps } from './models';

const Arrow = ({ direction = 'right', clickFunction, icon }: ArrowProps) => {
  return (
<<<<<<< HEAD
    <button className={`slide-arrow ${direction}`} onClick={clickFunction}>
      {icon}
    </button>
=======
    <div className={`slide-arrow ${direction}`} onClick={clickFunction}>
      {icon}
    </div>
>>>>>>> develop
  );
};

export default Arrow;
