import React from 'react';
import { Select, Option } from '../../common/Select';
import { enumToArray } from '../utils';
import { RecipeFilterProps, RecipeSortingOptions } from './models';
import cx from 'classnames';
import theme from './RecipeFilter.module.scss';
import { map } from 'lodash';

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

  return (
    <div className={classWrapper}>
      <span>
        {results} {results > 1 ? resultLabelPlural : resultLabel}
      </span>
      <Select
        options={sortingOptions}
        className="recipe-filter__sort"
        placeholder={sortSelectPlaceholder}
        changeHandler={onChangeSorting}
      />
    </div>
  );
};

export default Filter;
