import React from 'react';
import { CheckelemProps, checkelemTypes } from './models';
// import theme from './Checkelem.module.scss';
import cx from 'classnames';

const Checkelem = ({
  type,
  labelText,
  name,
  className = '',
  isChecked,
}: CheckelemProps) => {
  let inputType = '';
  let typeClassName = '';
  if (type === checkelemTypes.checkbox) {
    inputType = 'checkbox';
    typeClassName = 'checkbox';
  }
  if (type === checkelemTypes.radio) {
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
      {labelText}
    </label>
  );
};

export default Checkelem;
