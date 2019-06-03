import React, { useState } from 'react';
import { FavoriteProps } from './models';
// @ts-ignore
import theme from './Favorite.module.scss';
import cx from 'classnames';

const Favorite = ({
  icon,
  iconSelected = icon,
  isSelected,
  onChange,
  className = '',
}: FavoriteProps) => {
  const [selected, setSelected] = useState<boolean | undefined>(isSelected);
  const wrapClasses = cx(theme.favorite, className, {
    'favorite-selected': selected,
  });
  const theIcon = selected ? iconSelected : icon;
  const onFavoriteClick = () => {
    const newVal = !selected;
    setSelected(newVal);
    if (typeof onChange !== 'undefined') {
      onChange(newVal);
    }
  };
  return (
    <button
      type="button"
      data-componentname="favorite"
      className={wrapClasses}
      onClick={onFavoriteClick}
    >
      {theIcon}
    </button>
  );
};

export default Favorite;
