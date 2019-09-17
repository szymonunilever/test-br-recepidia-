/* eslint-disable @typescript-eslint/camelcase */
import cx from 'classnames';
import React, { MouseEvent, useEffect, useState } from 'react';
import theme from './Button.module.scss';
import { ButtonProps, ButtonViewType } from './models';
import getComponentDataAttrs from '../../utils/getComponentDataAttrs';

export const Button = ({
  Icon,
  IconSelected = Icon,
  isDisabled = false,
  isSelected = false,
  onClick,
  hidden = false,
  className = '',
  children = '',
  type = 'button',
  isToggle = false,
  viewType = ButtonViewType.classic,
  content,
  role,
  attributes = {},
}: ButtonProps) => {
  const { label } = content || { label: '' };
  const [selected, setSelected] = useState<boolean | undefined>(isSelected);
  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);
  const buttonClasses = cx(
    viewType === ButtonViewType.icon ? theme.icon : theme.button,
    className,
    {
      button__selected: selected,
      button__disabled: isDisabled,
    }
  );

  const IconComponent = selected ? IconSelected : Icon;
  const onButtonClick = (e: MouseEvent) => {
    e.preventDefault();

    if (isToggle) {
      const newVal = !selected;
      setSelected(newVal);
      onClick && onClick(newVal);
    } else {
      onClick && onClick(false);
    }
  };
  const props = {
    role,
    type,
    ...getComponentDataAttrs('button', content),
    onClick: onButtonClick,
    disabled: isDisabled,
    hidden,
  };

  if (role === 'tab') {
    // @ts-ignore
    isToggle ? (props['aria-selected'] = selected) : null;
  } else {
    // @ts-ignore
    isToggle ? (props['aria-pressed'] = selected) : null;
  }

  return (
    <button className={buttonClasses} {...props} {...attributes}>
      {IconComponent && <IconComponent />}
      {label ? <span className="button__label">{label}</span> : null}
      {children}
    </button>
  );
};

export default Button;
