import cx from 'classnames';
import React, { MouseEvent, useEffect, useState } from 'react';
import { ButtonProps, ButtonViewType } from './models';
import theme from './Button.module.scss';

export const Button = ({
  Icon,
  IconSelected = Icon,
  isSelected = false,
  onClick,
  hidden = false,
  className = '',
  children = '',
  isToggle = false,
  toggleExternalManage = false,
  viewType = ButtonViewType.classic,
  content,
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

  const view =
    viewType === ButtonViewType.icon ? (
      <button
        type="button"
        data-componentname="button"
        className={iconClasses}
        onClick={onButtonClick}
        hidden={hidden}
      >
        {TheIcon ? <TheIcon /> : null}
      </button>
    ) : (
      <button
        type="button"
        data-componentname="button"
        className={wrapClasses}
        onClick={onButtonClick}
        hidden={hidden}
      >
        {TheIcon ? <TheIcon /> : null}
        {label ? <span className="button__label">{label}</span> : null}
        {children}
      </button>
    );

  return view;
};

export default Button;
