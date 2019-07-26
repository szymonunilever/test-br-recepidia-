import cx from 'classnames';
import React, { MouseEvent, useEffect, useState } from 'react';
import theme from './Button.module.scss';
import { ButtonProps, ButtonViewType } from './models';

export const Button = ({
  Icon,
  IconSelected = Icon,
  isSelected = false,
  onClick,
  hidden = false,
  className = '',
  children = '',
  type = 'button',
  isToggle = false,
  toggleExternalManage = false,
  viewType = ButtonViewType.classic,
  content,
  attributes = {},
}: ButtonProps) => {
  const { label } = content || { label: '' };
  const [selected, setSelected] = useState<boolean | undefined>(isSelected);
  useEffect(() => {
    if (toggleExternalManage && selected !== isSelected) {
      setSelected(isSelected);
    }
  });
  const wrapClasses = cx(theme.button, className, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    button__selected: selected,
  });
  const iconClasses = cx(theme.icon, className, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    button__selected: selected,
  });
  const TheIcon = selected ? IconSelected : Icon;
  const onButtonClick = (e: MouseEvent) => {
    e.preventDefault();
    if (isToggle) {
      const newVal = !selected;
      setSelected(newVal);
      if (typeof onClick !== 'undefined') {
        onClick(newVal);
      }
    } else {
      if (typeof onClick !== 'undefined') {
        onClick(false);
      }
    }
  };
  const props = {
    type,
    'data-componentname': 'button',
    onClick: onButtonClick,
    hidden,
  };

  // @ts-ignore
  isToggle ? (props['aria-pressed'] = selected) : null;

  return viewType === ButtonViewType.icon ? (
    <button className={iconClasses} {...props} {...attributes}>
      {TheIcon ? <TheIcon /> : null}
    </button>
  ) : (
    <button className={wrapClasses} {...props} {...attributes}>
      {TheIcon ? <TheIcon /> : null}
      {label ? <span className="button__label">{label}</span> : null}
      {children}
    </button>
  );
};

export default Button;
