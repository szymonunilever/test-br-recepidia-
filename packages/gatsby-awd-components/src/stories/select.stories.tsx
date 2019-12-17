import { storiesOf } from '@storybook/react';
import React from 'react';
import { Select } from '../index';
import selectOptions from '../mocks/select.json';
import { action } from '@storybook/addon-actions';

const options = selectOptions.options;

storiesOf('Generic/Select', module).add(
  'customizable select without options',
  () => (
    <Select
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
