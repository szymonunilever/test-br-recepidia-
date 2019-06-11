import React from 'react';
import { CheckElemProps, checkElemTypes } from './models';
// import theme from './CheckElem.module.scss';
import cx from 'classnames';

const CheckElem = ({
  type,
  label,
  name,
  className = '',
  isChecked,
}: CheckElemProps) => {
  let inputType = '';
  let typeClassName = '';
  if (type === checkElemTypes.checkbox) {
    inputType = 'checkbox';
    typeClassName = 'checkbox';
  }
  if (type === checkElemTypes.radio) {
    inputType = 'radio';
    typeClassName = 'radiobtn';
  }

  const wrapClasses = cx('checkable', className, typeClassName);
  return (
    <label className={wrapClasses}>
      <input
        type={inputType}
        className="checkable_input"
        name={name}
        defaultChecked={isChecked}
      />
      <span className="checkable_checkelem">
        <span className="checkmark" />
      </span>
      {label}
    </label>
  );
};

export default CheckElem;
