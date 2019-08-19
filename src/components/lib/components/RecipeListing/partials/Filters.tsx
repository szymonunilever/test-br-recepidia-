import cx from 'classnames';
import React, { useState } from 'react';
import { Option, Select } from '../../Select';
import { Tags } from '../../Tags';
import { enumToArray } from '../utils';
import { RecipeFilterProps, RecipeSortingOptions } from './models';
import theme from './RecipeFilter.module.scss';
import { Button, ButtonViewType } from '../../Button';
import { FilterSettings } from './index';
import map from 'lodash/map';
import remove from 'lodash/remove';
import { Modal } from 'src/components/lib/components/Modal';
import { ReactComponent as CloseSvg } from 'src/svgs/inline/x-mark.svg';
import { TagVariant } from '../../Tags/models';

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
  dataFetched,
}: RecipeFilterProps) => {
  const [state, setState] = useState<{
    showFilterSettings: boolean;
    filterTags: Internal.Tag[];
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

  const sortingChange = (val: Option[]) => {
    if (val.length && onChangeSorting) {
      onChangeSorting(parseInt(val[0].value));
    }
  };

  const toggleFilterSettings = () => {
    setState({
      ...state,
      showFilterSettings: !state.showFilterSettings,
    });
  };

  const onFilterChange = (val: Internal.Tag[]) => {
    setState({
      ...state,
      filterTags: val,
    });
    onChangeFilter(val);
  };

  const onTagRemoved = (val: Internal.Tag) => {
    const filtered = [...state.filterTags];
    remove(filtered, (item: Internal.Tag) => item.id === val.id);
    setState({
      ...state,
      filterTags: filtered,
    });
    onChangeFilter(filtered);
  };

  const counter = (
    <span className="filter__count">
      {dataFetched ? (
        <>
          {results} {results > 1 ? resultLabelPlural : resultLabel}
        </>
      ) : null}
    </span>
  );

  return (
    <div className={classWrapper}>
      {counter}
      {optionLabels ? (
        <label className="filter__sort-label">
          <span className="filter__sort-label-text">sorting</span>
          <Select
            options={sortingOptions}
            className="filter__sort"
            placeholder={sortSelectPlaceholder}
            changeHandler={sortingChange}
          />
        </label>
      ) : null}
      <Modal
        isOpen={state.showFilterSettings}
        close={toggleFilterSettings}
        className="modal--filter"
        closeBtn={<CloseSvg />}
        title="Filters"
        titleLevel={2}
      >
        <FilterSettings
          allFilters={allFilters}
          onFilterChange={onFilterChange}
          OpenIcon={OpenIcon}
          filtersSelected={state.filterTags}
          // hidden={!state.showFilterSettings}
          content={content}
          onApply={toggleFilterSettings}
        />
      </Modal>
      <Button
        className="filter__button"
        Icon={FilterIcon}
        viewType={ButtonViewType.classic}
        onClick={toggleFilterSettings}
        attributes={{ 'aria-label': 'open modal with fiter settings' }}
      />
      <Tags
        list={state.filterTags}
        content={{ title: undefined, loadMoreButton: undefined }}
        variant={TagVariant.removable}
        RemoveIcon={RemoveTagIcon}
        enableExternalManage
        handleTagRemove={onTagRemoved}
        initialCount="all"
      />
    </div>
  );
};

export default Filter;
