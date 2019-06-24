import cx from 'classnames';
import { map } from 'lodash';
import React, { useState } from 'react';
import { Option, Select } from '../../common/Select';
import { Tags } from '../../Tags';
import { enumToArray } from '../utils';
import { RecipeFilterProps, RecipeSortingOptions } from './models';
import theme from './RecipeFilter.module.scss';
import { Button, ButtonViewType } from '../../common/Button';
import { FilterSettings } from './index';
import { remove } from 'lodash';

const Filter = ({
  className,
  allFilters,
  OpenIcon,
  FilterIcon,
  RemoveTagIcon,
  onChangeSorting,
  onChangeFilter,
  results,
  sortSelectPlaceholder,
  content: { resultLabelPlural, resultLabel, optionLabels, ...content },
}: RecipeFilterProps) => {
  const [state, setState] = useState<{
    showFilterSettings: boolean;
    filterTags: RMSData.Tag[];
  }>({
    showFilterSettings: false,
    filterTags: [],
  });

  const classWrapper = cx(theme.recipeFilter, className);

  const sortingOptions: Option[] = optionLabels
    ? map(enumToArray(RecipeSortingOptions), (item, key) => ({
        label: optionLabels[item],
        value: '' + key,
      }))
    : [];

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

  const onFilterChange = (val: RMSData.Tag[]) => {
    setState({
      ...state,
      filterTags: val,
    });
    onChangeFilter(val);
  };

  const onTagRemoved = (val: RMSData.Tag) => {
    const filtered = [...state.filterTags];
    remove(filtered, (item: RMSData.Tag) => item.id === val.id);
    setState({
      ...state,
      filterTags: filtered,
    });
    onChangeFilter(filtered);
  };

  return (
    <div className={classWrapper}>
      <span>
        {results} {results > 1 ? resultLabelPlural : resultLabel}
      </span>
      {optionLabels ? (
        <Select
          options={sortingOptions}
          className="recipe-filter__sort"
          placeholder={sortSelectPlaceholder}
          changeHandler={sortingChange}
        />
      ) : null}
      <FilterSettings
        allFilters={allFilters}
        onFilterChange={onFilterChange}
        OpenIcon={OpenIcon}
        filtersSelected={state.filterTags}
        hidden={!state.showFilterSettings}
        content={content}
        onApply={toggleFilterSettings}
      />
      <Button
        className="recipe-filter__button"
        Icon={FilterIcon}
        viewType={ButtonViewType.classic}
        onClick={toggleFilterSettings}
      />
      <Tags
        list={state.filterTags}
        content={{ title: undefined, loadMoreButton: undefined }}
        isEditable
        RemoveIcon={RemoveTagIcon}
        enableExternalManage
        handleTagRemove={onTagRemoved}
        initialCount="all"
      />
    </div>
  );
};

export default Filter;
