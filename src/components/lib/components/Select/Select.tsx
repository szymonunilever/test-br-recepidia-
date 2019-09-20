import React, { useState } from 'react';
import { SelectProps, Option } from './models';
// @ts-ignore
import DropdownSelect from 'react-dropdown-select';

import cx from 'classnames';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomOption = (props: any) => {
  const {
    children,
    className,
    isDisabled,
    isSelected,
    onClick,
    item,
    itemIndex,
  } = props;
  {
    return (
      <div
        role="option"
        key={item.label + itemIndex}
        aria-selected={isSelected}
        onClick={onClick}
        aria-label={item.label}
        className={cx(
          {
            option: true,
            'is-disabled': isDisabled,
            'is-selected': isSelected,
          },
          className
        )}
      >
        {children}
      </div>
    );
  }
};

const Select = ({
  input,
  options,
  className = '',
  placeholder = '',
  changeHandler,
  formatOptionLabel,
  defaultValue,
  searchable = false,
}: SelectProps) => {
  className = cx(className, 'select');
  const [values, setValues] = useState(defaultValue ? [defaultValue] : []);

  const onChange = (values: Option[]) => {
    setValues(values);
    if (changeHandler) {
      changeHandler(values);
    }
  };

  const onItemRenderer = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ({ item, itemIndex, props, state, methods }: any) => {
      const Composition = (
        <CustomOption
          itemIndex={itemIndex}
          isDisabled={state.disabled}
          isSelected={!!values.length && values[0].value === item.value}
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            e.preventDefault();
            methods.addItem(item);
          }}
          className={props.className}
          item={item}
        >
          {formatOptionLabel ? formatOptionLabel(item) : item.label}
        </CustomOption>
      );

      return Composition;
    };
  };

  const props = {
    values,
    separator: true,
    options,
    className,
    searchable,
    placeholder,
    onChange,
    itemRenderer: onItemRenderer(),
    closeOnSelect: true,
    ...input,
  };

  return <DropdownSelect {...props} />;
};

export default Select;
