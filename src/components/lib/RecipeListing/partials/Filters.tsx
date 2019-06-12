import cx from 'classnames';
import { map } from 'lodash';
import React, { useState } from 'react';
import { Option, Select } from '../../common/Select';
import { enumToArray } from '../utils';
import { RecipeFilterProps, RecipeSortingOptions, Tag } from './models';
import theme from './RecipeFilter.module.scss';
import { Button, ButtonViewType } from '../../common/Button';
import Icon from 'src/svgs/inline/plus.svg';
import { FilterSettings } from './index';

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
  const [state, setState] = useState({
    showFilterSettings: false,
  });
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

  const toggleFilterSettings = () => {
    setState({
      ...state,
      showFilterSettings: !state.showFilterSettings,
    });
  };

  const onFilterChange = (val: Tag[]) => {
    // eslint-disable-next-line no-console
    console.log(val);
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
      <FilterSettings
        allFilters={allFilters}
        onFilterChange={onFilterChange}
        hidden={!state.showFilterSettings}
      />
      <Button
        className="recipe-filter__button"
        icon={<Icon />}
        viewType={ButtonViewType.icon}
        onClick={toggleFilterSettings}
      />
    </div>
  );
};

export default Filter;
