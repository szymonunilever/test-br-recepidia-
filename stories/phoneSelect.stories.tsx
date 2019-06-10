import { storiesOf } from '@storybook/react';
import React from 'react';

storiesOf('Components/Form elements/Phone Select', module).add(
  'select story',
  () => (
    <div className="select">
      <select className="select-html">
        <option value="" />
        <option value="apple" className="select-option">
          Apple
        </option>
        <option value="orange" className="select-option">
          Orange
        </option>
        <option value="Banana" className="select-option">
          Banana
        </option>
      </select>
    </div>
  ),
  {
    info: { inline: false },
  }
);
