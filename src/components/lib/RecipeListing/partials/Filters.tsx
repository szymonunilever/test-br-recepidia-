import cx from 'classnames';
import { map } from 'lodash';
import React from 'react';
import { Option, Select } from '../../common/Select';
import { enumToArray } from '../utils';
import { RecipeFilterProps, RecipeSortingOptions } from './models';
import theme from './RecipeFilter.module.scss';

const Filter = ({
  className,
  allFilters,
  onChangeSorting,
  onChangeFilter,
  resultLabel,
  resultLabelPlural,
  results,
  optionLabels,
  sortSelectPlaceholder,
}: RecipeFilterProps) => {
  const classWrapper = cx(theme.recipeFilter, className);

  const onTagClick = (val: string) => {
    // eslint-disable-next-line no-console
    console.log(val);
  };
  const sortingOptions: Option[] = map(
    enumToArray(RecipeSortingOptions),
    (item, key) => ({
      label: optionLabels[item],
      value: '' + key,
    })
  );

  const sortingChange = (val: Option) => {
    if (val && onChangeSorting) {
      onChangeSorting(parseInt(val.value));
    }
  };

  return (
    <div className={classWrapper}>
      <span>
        {results} {results > 1 ? resultLabelPlural : resultLabel}
      </span>
      <Select
        options={sortingOptions}
        className="recipe-filter__sort"
        placeholder={sortSelectPlaceholder}
        changeHandler={sortingChange}
      />
    </div>
  );
};

export default Filter;
