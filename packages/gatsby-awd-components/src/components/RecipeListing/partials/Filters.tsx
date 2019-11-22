import cx from 'classnames';
import React, { FunctionComponent, useState } from 'react';
import { iconNormalize } from '../../../utils';
import { Option, Select } from '../../Select';
import { Tags } from '../../Tags';
import { enumToArray } from '../utils';
import { RecipeFilterProps, RecipeSortingOptions } from './models';
import theme from './Filters.module.scss';
import { Button, ButtonViewType } from '../../Button';
import { FilterSettings } from './index';
import map from 'lodash/map';
import filter from 'lodash/filter';
import { Modal } from '../../Modal';
import { TagVariant } from '../../Tags';

const Filter: FunctionComponent<RecipeFilterProps> = ({
  className,
  allFilters,
  filterTitle,
  icons,
  onChangeSorting,
  onChangeFilter,
  results,
  sortSelectPlaceholder,
  content: { resultLabelPlural, resultLabel, optionLabels, filtersPanel },
  dataFetched,
}) => {
  const classWrapper = cx(theme.filter, className);

  const [showFilterSettings, setShowFilterSettings] = useState<boolean>(false);
  //tags applied to filter query
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
        value: '' + item,
      }))
    : [];

  const sortingChange = (val: Option[]) => {
    if (val.length && onChangeSorting) {
      onChangeSorting((RecipeSortingOptions as any)[val[0].value]);
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
    <span className={cx(theme.filter__count, 'filter__count')}>
      {filterTitle ? (
        <>{filterTitle}</>
      ) : (
        <>
          {results} {results > 1 ? resultLabelPlural : resultLabel}
        </>
      )}
    </span>
  );

  return (
    <div className={classWrapper}>
      {counter}
      <div className={cx(theme.filter__sortBlock, 'filter__sort-block')}>
        {optionLabels ? (
          <div className={cx(theme.filter__sortLabel, 'filter__sort-label')}>
            <span
              className={cx(
                theme.filter__sortLabelText,
                'filter__sort-label-text'
              )}
            >
              sorting
            </span>
            <Select
              options={sortingOptions}
              className={cx(theme.filter__sort, 'filter__sort')}
              placeholder={sortSelectPlaceholder}
              changeHandler={sortingChange}
            />
          </div>
        ) : null}
        <Button
          className={cx(theme.filter__button, 'filter__button')}
          Icon={icons.filter}
          viewType={ButtonViewType.classic}
          onClick={() => {
            toggleFilterSettings();
            setSelectedTags(filterTags);
          }}
          attributes={{ 'aria-label': 'open modal with fiter settings' }}
        />
      </div>
      <Modal
        isOpen={showFilterSettings}
        close={toggleFilterSettings}
        className={cx(theme.modalFilter, 'modal--filter')}
        closeBtn={iconNormalize(icons.close)}
        title={filtersPanel && filtersPanel.title}
        titleLevel={2}
      >
        <FilterSettings
          allFilters={allFilters}
          onFilterChange={setSelectedTags}
          icons={icons}
          filtersSelected={selectedTags}
          content={{ filtersPanel }}
          onApply={applySelectedTagsToFilter}
        />
      </Modal>

      <Tags
        list={filterTags}
        content={{ title: undefined, loadMoreButton: undefined }}
        variant={TagVariant.removable}
        RemoveIcon={icons.removeTag}
        handleTagRemove={onTagRemoved}
        initialCount="all"
      />
    </div>
  );
};

export default Filter;
