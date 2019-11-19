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
  input,
  value,
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

  const wrapClasses = cx('checkable__label', className, typeClassName);
  return (
    <label className={wrapClasses}>
      <input
        type={inputType}
        className="checkable__input"
        name={name}
        defaultChecked={isChecked}
        {...input}
        value={value}
      />
      <span className="checkable__checkelem">
        <span className="checkable__checkmark" />
      </span>
      <span dangerouslySetInnerHTML={{ __html: label as string }} />
    </label>
  );
};

export default CheckElem;
