import React, { useState } from 'react';
import { Tags } from '../../Tags';
import {
  FilterSettingsProps,
  RecipeFilterOptions,
  Tag,
  TagCategory,
} from './models';
import cx from 'classnames';
import theme from './FilterSettings.module.scss';
import { ItemProps, TagToggleHandler, TagViewType } from '../../Tags/models';
import { remove } from 'lodash';

const FiterSettings = ({
  allFilters,
  onFilterChange,
  className,
  hidden,
}: FilterSettingsProps) => {
  const [state, setState] = useState<{ filters: ItemProps[] }>({
    filters: [],
  });
  const classWrapper = cx(theme.filterSettings, className);
  const onToggleFilter = (val: TagToggleHandler) => {
    const filters = state.filters;
    val.state
      ? filters.push(val.tag)
      : filters.length > 0
      ? remove(filters, (t: ItemProps) => t.id === val.tag.id)
      : null;

    setState({ ...state, filters });

    onFilterChange(filters);
  };

  return (
    <div className={classWrapper} hidden={hidden}>
      <ul className="filter-settings__categories">
        {allFilters.categories.map((item: TagCategory, key) => (
          <li key={key} className="filter-settings__category-item">
            <span className="filter-settings__category-header">
              {item.categoryName}
            </span>
            <Tags
              isEditable={false}
              content={{ cta: { label: '' } }}
              list={item.tags}
              viewType={TagViewType.filter}
              initialCount={0}
              handleToggle={onToggleFilter}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FiterSettings;
