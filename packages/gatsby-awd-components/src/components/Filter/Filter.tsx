import React, { FunctionComponent, useState, useEffect } from 'react';
import { Button, ButtonViewType, Modal, Option, Select, Tags, TagVariant } from '../';
import { FilterProps, SortingOptions, FilterSettings, FilterIcons } from './';
import { iconNormalize, enumToArray } from '../../utils';
import theme from './Filter.module.scss';
import cx from 'classnames';
import { ReactComponent as RemoveTagIcon, ReactComponent as CloseSvg } from '../../svgs/inline/x-mark.svg';
import { ReactComponent as ClosedIcon } from '../../svgs/inline/arrow-up.svg';
import { ReactComponent as FilterIcon } from '../../svgs/inline/filter.svg';
import { ReactComponent as OpenIcon } from '../../svgs/inline/arrow-down.svg';

export const icons: FilterIcons = {
  close: CloseSvg,
  closed: ClosedIcon,
  filter: FilterIcon,
  open: OpenIcon,
  removeTag: RemoveTagIcon,
};

const Filter: FunctionComponent<FilterProps> = ({
  className,
  allFilters,
  filterTitle,
  onChangeSorting,
  onChangeFilter,
  results,
  searchQuery,
  sortSelectPlaceholder,
  content: { resultLabelPlural, resultLabel, optionLabels, filtersPanel },
}) => {
  const classWrapper = cx(theme.filter, className);
  const [showFilterSettings, setShowFilterSettings] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<Internal.Tag[]>([]);
  const applySelectedTagsToFilter = () => {
    setShowFilterSettings(!showFilterSettings);
    onChangeFilter(selectedTags);
  };
  const sortingOptions: Option[] = optionLabels ?
    enumToArray(SortingOptions).map(item => ({
      label: optionLabels[item],
      value: '' + item,
    }))
    : [];
  const sortingChange = (val: Option[]) => {
    if (val.length && onChangeSorting) {
      onChangeSorting((SortingOptions as any)[val[0].value]);
    }
  };
  const toggleFilterSettings = () => {
    setShowFilterSettings(!showFilterSettings);
  };

  const onTagRemoved = (val: Internal.Tag) => {
    const tagsAfterRemove = selectedTags.filter(
      (item: Internal.Tag) => item.tagId !== val.tagId,
    );
    setSelectedTags(tagsAfterRemove);
    onChangeFilter(tagsAfterRemove);
  };
  const counter = (
    <span className={cx(theme.filter__count, 'filter__count')}>
      {filterTitle || <>{results} {results > 1 ? resultLabelPlural : resultLabel} </>}
    </span>
  );

  useEffect(() => {
    setSelectedTags([])
  }, [searchQuery]);

  return (
    <div className={classWrapper}>
      {counter}
      {!results && !setSelectedTags.length ? null : (
        <div className={cx(theme.filter__sortBlock, 'filter__sort-block')}>
          {optionLabels ? (
            <div className={cx(theme.filter__sortLabel, 'filter__sort-label')}>
            <span
              className={cx(
                theme.filter__sortLabelText,
                'filter__sort-label-text',
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
            onClick={toggleFilterSettings}
            attributes={{ 'aria-label': 'open modal with filter settings' }}
          />
        </div>
      )}
      <Modal
        isOpen={showFilterSettings}
        close={toggleFilterSettings}
        className={cx(theme.modalFilter, 'modal--filter')}
        closeBtn={iconNormalize(icons.close)}
        title={filtersPanel && filtersPanel.title}
      >
        <FilterSettings
          allFilters={allFilters}
          onFilterChange={setSelectedTags}
          icons={icons}
          selectedTags={selectedTags}
          content={{ filtersPanel }}
          onApply={applySelectedTagsToFilter}
        />
      </Modal>
      <Tags
        list={selectedTags}
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
