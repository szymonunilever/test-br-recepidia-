import React from 'react';
import { CustomSelectProps } from './models';
// import theme from './Checkelem.module.scss';
import Select from 'react-select';
import cx from 'classnames';

const Option = (props: any) => {
  const {
    children,
    className,
    isDisabled,
    isFocused,
    isSelected,
    innerRef,
    innerProps,
  } = props;
  return (
    <div
      ref={innerRef}
      className={cx(
        {
          option: true,
          'is-disabled': isDisabled,
          'is-focused': isFocused,
          'is-selected': isSelected,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

const CustomSelect = ({
  options,
  changeHandler,
  className = '',
  placeholder = '',
}: CustomSelectProps) => {
  const resetStyles = {};
  return (
    <Select
      styles={resetStyles}
      options={options}
      className={className}
      components={{ Option }}
      placeholder={placeholder}
      onChange={changeHandler}
    />
  );
};

export default CustomSelect;
