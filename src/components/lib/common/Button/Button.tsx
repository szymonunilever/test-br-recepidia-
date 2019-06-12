import cx from 'classnames';
import React, { MouseEvent, useState } from 'react';
import { ButtonProps, ButtonViewType } from './models';
import theme from './Button.module.scss';

const Button = ({
  icon,
  iconSelected = icon,
  isSelected = false,
  onClick,
  hidden = false,
  className = '',
  children = '',
  isToggle = false,
  viewType = ButtonViewType.classic,
  label = '',
}: ButtonProps) => {
  const [selected, setSelected] = useState<boolean | undefined>(isSelected);
  const wrapClasses = cx(className, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    button__selected: selected,
  });
  const iconClasses = cx(theme.icon, className, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    button__selected: selected,
  });
  const theIcon = selected ? iconSelected : icon;
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
        {theIcon}
      </button>
    ) : (
      <button
        type="button"
        data-componentname="button"
        className={wrapClasses}
        onClick={onButtonClick}
        hidden={hidden}
      >
        {theIcon}
        {label ? <span className="button__label">{label}</span> : null}
        {children}
      </button>
    );

  return <>{view}</>;
};

export default Button;
