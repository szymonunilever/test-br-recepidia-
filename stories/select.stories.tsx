import { storiesOf } from '@storybook/react';
import React from 'react';
import { CustomSelect } from '../src/components/lib/CustomSelect';
import selectOptions from 'src/components/data/customSelect.json';
import { action } from '@storybook/addon-actions';

const options = selectOptions.options;

storiesOf('Components/Form elements/Select', module).add(
  'select with custom options list styles',
  () => (
    <CustomSelect
      options={options}
      className="select"
      placeholder="How can we help?"
      changeHandler={action('option selected')}
    />
  ),
  {
    info: { inline: false },
  }
);
