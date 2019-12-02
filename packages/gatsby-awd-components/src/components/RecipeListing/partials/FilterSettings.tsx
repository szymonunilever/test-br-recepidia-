import cx from 'classnames';
import remove from 'lodash/remove';
import get from 'lodash/get';
import React from 'react';
import { Accordion } from '../../Accordion';
import { Button } from '../../Button';
import { Tags } from '../../Tags';
import { TagToggleHandler, TagViewType, TagVariant } from '../../Tags/models';
import theme from './FilterSettings.module.scss';
import { FilterSettingsProps } from './models';

const FilterSettings = ({
  allFilters,
  filtersSelected,
  onFilterChange,
  className,
  hidden,
  icons,
  onApply,
  content: { filtersPanel },
}: FilterSettingsProps) => {
  const classWrapper = cx(theme.filterSettings, 'filter-settings', className);
  const onToggleFilter = (val: TagToggleHandler) => {
    const filters = [...filtersSelected];
    if (val.state) {
      filters.push(val.tag);
    } else if (filters.length > 0) {
      remove(filters, (t: Internal.Tag) => t.id === val.tag.id);
    }
    onFilterChange(filters);
  };
  const onReset = () => {
    onFilterChange([]);
  };

  const displayGroups =
    allFilters.displayCategories && allFilters.displayCategories.length > 0
      ? (allFilters.displayCategories
          .map(groupName =>
            allFilters.tagGroups.find(item => item.name === groupName)
          )
          .filter(item => item !== undefined) as Internal.TagGroup[])
      : allFilters.tagGroups;

  return (
    <div className={classWrapper} hidden={hidden}>
      <ul
        className={cx(
          theme.filterSettings__tagGroups,
          'filter-settings__tagGroups'
        )}
      >
        {displayGroups.map((item: Internal.TagGroup, key) => (
          <li
            key={key}
            className={cx(
              theme.filterSettings__categoryItem,
              'filter-settings__category-item'
            )}
          >
            <Accordion
              className={cx(
                theme.filterSettings__categoryHeader,
                'filter-settings__category-header'
              )}
              title={{ label: item.label, name: item.name }}
              Icon={icons.open}
              IconOpened={icons.closed}
              isOpen={false}
            >
              <Tags
                list={item.children}
                content={{ title: undefined, loadMoreButton: undefined }}
                enableExternalManage
                selectedTags={filtersSelected}
                viewType={TagViewType.filter}
                initialCount={0}
                handleTagToggle={onToggleFilter}
                variant={TagVariant.toggle}
              />
            </Accordion>
          </li>
        ))}
      </ul>
      <div
        className={cx(
          theme.filterSettings__buttons,
          'filter-settings__buttons'
        )}
      >
        <Button
          className={cx(
            theme.filterSettings__reset,
            'filter-settings__reset',
            'button--secondary'
          )}
          onClick={onReset}
          content={filtersPanel && filtersPanel.ctas.reset}
        />
        <Button
          className={cx(theme.filterSettings__apply, 'filter-settings__apply')}
          onClick={onApply}
          content={filtersPanel && filtersPanel.ctas.apply}
        />
      </div>
    </div>
  );
};

export default FilterSettings;
