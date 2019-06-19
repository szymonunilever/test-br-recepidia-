import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  CheckElem,
  checkElemTypes,
} from '../src/components/lib/common/CheckElem/index';

storiesOf(
  'Components/Form elements/Checkbox+Radio button combined element',
  module
)
  .add(
    'Unselected checkbox',
    () => (
      <CheckElem
        type={checkElemTypes.checkbox}
        name="test"
        label="this is label"
        value="test"
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Selected checkbox with a lot of text',
    () => (
      <CheckElem
        type={checkElemTypes.checkbox}
        name="test"
        label="Checkbox label with a lot of text: Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Doloremque est soluta inventore saepe
          perspiciatis sed aperiam reprehenderit suscipit, atque nisi fugit
          eligendi dignissimos quaerat corrupti? Dolorum sapiente dolore eius
          delectus."
        value="test2"
        isChecked={true}
        value="test"
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Unselected radio button',
    () => (
      <CheckElem
        type={checkElemTypes.radio}
        name="radiotest"
        label="this is label"
<<<<<<< HEAD
        value="test"
=======
        value="test3"
>>>>>>> develop
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Selected radio button with a lot of text',
    () => (
      <CheckElem
        type={checkElemTypes.radio}
        name="radiotest"
        label="Radio button label with a lot of text: Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Doloremque est soluta inventore saepe
          perspiciatis sed aperiam reprehenderit suscipit, atque nisi fugit
          eligendi dignissimos quaerat corrupti? Dolorum sapiente dolore eius
          delectus."
        value="test4"
        isChecked={true}
        value="test"
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
        <CheckElem
          type={checkElemTypes.radio}
          name="radiotest"
          label="Option 1"
<<<<<<< HEAD
          value="test"
=======
          value="option1"
>>>>>>> develop
        />
        <CheckElem
          type={checkElemTypes.radio}
          name="radiotest"
          label="Option 2"
<<<<<<< HEAD
          value="test"
=======
          value="option2"
>>>>>>> develop
        />
        <CheckElem
          type={checkElemTypes.radio}
          name="radiotest"
          label="Option 3"
<<<<<<< HEAD
          value="test"
=======
          value="option3"
>>>>>>> develop
        />
      </div>
    ),
    {
      info: { inline: false },
    }
  );
