import { storiesOf } from '@storybook/react';
import React from 'react';
import { CustomSelect } from '../src/components/lib/CustomSelect';
import selectOptions from 'src/components/data/customSelect.json';

const options = selectOptions.options;

storiesOf('Components/Form elements/Select', module).add(
  'select with custom options list styles',
  () => (
    <CustomSelect
      options={options}
      className="select"
      placeholder="How can we help?"
      changeHandler={report}
    />
  ),
  {
    info: { inline: false },
  }
);

const report = (val: any) => {
  console.log(val.value);
};
