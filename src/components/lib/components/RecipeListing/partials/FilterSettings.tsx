import cx from 'classnames';
import { remove } from 'lodash';
import React from 'react';
import { Accordion } from '../../common/Accordion';
import { Button } from '../../common/Button';
import { Tags } from '../../Tags';
import { TagToggleHandler, TagViewType, TagVariant } from '../../Tags/models';
import theme from './FilterSettings.module.scss';
import { FilterSettingsProps } from './models';

const FilterSettings = ({
  allFilters,
  filtersSelected,
  onFilterChange,
  OpenIcon,
  CloseIcon = OpenIcon,
  className,
  hidden,
  onApply,
  content: { filtersCta },
}: FilterSettingsProps) => {
  const resetLabel = filtersCta ? filtersCta.resetLabel : { label: '' };
  const applyLabel = filtersCta ? filtersCta.applyLabel : { label: '' };
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

  return (
    <div className={classWrapper} hidden={hidden}>
      <ul className="filter-settings__tagGroups">
        {allFilters.tagGroups.map((item: Internal.TagGroup, key) => (
          <li key={key} className="filter-settings__category-item">
            <Accordion
              className="filter-settings__category-header"
              title={item.name}
              Icon={OpenIcon}
              IconOpened={CloseIcon}
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
      <div className="filter-settings__buttons">
        <Button
          className="filter-settings__reset"
          onClick={onReset}
          content={resetLabel}
        />
        <Button
          className="filter-settings__apply"
          onClick={onApply}
          content={applyLabel}
        />
      </div>
    </div>
  );
};

export default FilterSettings;
