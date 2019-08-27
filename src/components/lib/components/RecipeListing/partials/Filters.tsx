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
import filter from 'lodash/filter';
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
  const classWrapper = cx(theme.recipeFilter, className);

  const [showFilterSettings, setShowFilterSettings] = useState<boolean>(false);
  //tags applyed to filter query
  const [filterTags, setFilterTags] = useState<Internal.Tag[]>([]);
  //selected tags in filterSettings popup
  const [selectedTags, setSelectedTags] = useState<Internal.Tag[]>([]);

  const applySelectedTagsToFilter = () => {
    setFilterTags(selectedTags);
    setShowFilterSettings(!showFilterSettings);
    onChangeFilter(selectedTags);
  };

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
    setShowFilterSettings(!showFilterSettings);
  };

  const onTagRemoved = (val: Internal.Tag) => {
    const tagsAfterRemove = filter(
      filterTags,
      (item: Internal.Tag) => item.tagId !== val.tagId
    );

    setFilterTags(tagsAfterRemove);
    setSelectedTags(tagsAfterRemove);
    onChangeFilter(tagsAfterRemove);
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
        isOpen={showFilterSettings}
        close={toggleFilterSettings}
        className="modal--filter"
        closeBtn={<CloseSvg />}
        title="Filters"
        titleLevel={2}
      >
        <FilterSettings
          allFilters={allFilters}
          onFilterChange={setSelectedTags}
          OpenIcon={OpenIcon}
          filtersSelected={selectedTags}
          // hidden={!state.showFilterSettings}
          content={content}
          onApply={applySelectedTagsToFilter}
        />
      </Modal>
      <Button
        className="filter__button"
        Icon={FilterIcon}
        viewType={ButtonViewType.classic}
        onClick={() => {
          toggleFilterSettings();
          setSelectedTags(filterTags);
        }}
        attributes={{ 'aria-label': 'open modal with fiter settings' }}
      />
      <Tags
        list={filterTags}
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
