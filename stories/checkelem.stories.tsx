import { storiesOf } from '@storybook/react';
import React from 'react';
import { Checkelem, checkelemTypes } from '../src/components/lib/Checkelem';

storiesOf(
  'Components/Form elements/Checkbox+Radio button combined element',
  module
)
  .add(
    'Unselected checkbox',
    () => (
      <Checkelem
        type={checkelemTypes.checkbox}
        name="test"
        labelText="this is label"
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Selected checkbox with a lot of text',
    () => (
      <Checkelem
        type={checkelemTypes.checkbox}
        name="test"
        labelText="Checkbox label with a lot of text: Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Doloremque est soluta inventore saepe
          perspiciatis sed aperiam reprehenderit suscipit, atque nisi fugit
          eligendi dignissimos quaerat corrupti? Dolorum sapiente dolore eius
          delectus."
        isChecked={true}
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Unselected radio button',
    () => (
      <Checkelem
        type={checkelemTypes.radio}
        name="radiotest"
        labelText="this is label"
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Selected radio button with a lot of text',
    () => (
      <Checkelem
        type={checkelemTypes.radio}
        name="radiotest"
        labelText="Radio button label with a lot of text: Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Doloremque est soluta inventore saepe
          perspiciatis sed aperiam reprehenderit suscipit, atque nisi fugit
          eligendi dignissimos quaerat corrupti? Dolorum sapiente dolore eius
          delectus."
        isChecked={true}
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Group of radio buttons',
    () => (
      <div>
        <Checkelem
          type={checkelemTypes.radio}
          name="radiotest"
          labelText="Option 1"
        />
        <Checkelem
          type={checkelemTypes.radio}
          name="radiotest"
          labelText="Option 2"
        />
        <Checkelem
          type={checkelemTypes.radio}
          name="radiotest"
          labelText="Option 3"
        />
      </div>
    ),
    {
      info: { inline: false },
    }
  );
