import React from 'react';
import { CountrySelectorProps, LanguageEntry } from './models';
import { Select } from '../common/Select';
import cx from 'classnames';

const CountrySelector = ({
  selected,
  list,
  className = '',
}: CountrySelectorProps) => {
  const selectClassName = cx('country-dropdown', className);
  const changeHandler = (selected: LanguageEntry) => {
    window.open(selected.path, '_self');
  };
  const formatOptionLabel = (item: LanguageEntry) => (
    <div>
      <div className="country-dropdown-icon">{item.icon}</div>
      <div className="country-dropdown-name">{item.value}</div>
      <div className="country-dropdown-iso">{item.label}</div>
    </div>
  );
  return (
    <div data-componentname="country-selector" className={selectClassName}>
      <Select
        options={list}
        placeholder={'Select'}
        className={'country-dropdown-select'}
        changeHandler={changeHandler}
        formatOptionLabel={formatOptionLabel}
        defaultValue={selected}
      />
    </div>
  );
};

export default CountrySelector;
