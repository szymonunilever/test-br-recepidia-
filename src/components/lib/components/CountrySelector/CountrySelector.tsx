import React from 'react';
import { CountrySelectorProps, LanguageEntry } from './models';
import { Select } from '../Select';
import { FlagIcon } from '../FlagIcon';
import cx from 'classnames';

const CountrySelector = ({
  selected,
  list,
  className = '',
  flagSize = '3x',
}: CountrySelectorProps) => {
  const selectClassName = cx('country-dropdown', className);
  const changeHandler = (selected: LanguageEntry) => {
    window.open(selected.path, '_self');
  };
  const formatOptionLabel = (item: LanguageEntry) => (
    <div>
      <FlagIcon
        className="country-dropdown-icon"
        code={item.label.toLowerCase()}
        size={flagSize}
      />
      <span className="country-dropdown-name">{item.value}</span>
      <span className="country-dropdown-iso">{item.label}</span>
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
