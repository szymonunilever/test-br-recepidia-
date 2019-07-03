import React from 'react';
import { SelectProps } from './models';
import ReactSelect from 'react-select';
import cx from 'classnames';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const Select = ({
  options,
  className = '',
  placeholder = '',
  input,
  changeHandler,
  defaultValue,
  formatOptionLabel,
}: SelectProps) => {
  const props = {
    ...input,
    styles: {},
    options,
    className,
    components: { Option },
    formatOptionLabel,
    defaultValue,
    placeholder,
  };

  changeHandler ? (props.onChange = changeHandler) : null;

  return <ReactSelect {...props} />;
};

export default Select;
