import React, { useState } from 'react';
import { FavoriteProps } from './models';

const Favorite = ({
  icon,
  iconSelected = icon,
  isSelected,
  onChange,
  className = '',
}: FavoriteProps) => {
  const [selected, setSelected] = useState<boolean | undefined>(isSelected);
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
      className={className}
      onClick={onFavoriteClick}
    >
      {theIcon}
    </button>
  );
};

export default Favorite;
