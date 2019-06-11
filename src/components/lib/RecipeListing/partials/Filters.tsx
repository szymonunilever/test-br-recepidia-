import React from 'react';
import { RecipeFilterProps } from './models';

const Filter = ({
  allFilters,
  selectedFilters,
  onChangeSorting,
  onChangeFilter,
  onTagRemove,
}: RecipeFilterProps) => {
  const onTagClick = (val: string) => {
    // eslint-disable-next-line no-console
    console.log(val);
  };
};

export default Filter;
