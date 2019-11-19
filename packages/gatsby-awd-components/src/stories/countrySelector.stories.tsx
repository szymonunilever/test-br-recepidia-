import { storiesOf } from '@storybook/react';
import React from 'react';
import { CountrySelector } from '../components/CountrySelector';
import countriesList from '../mocks/countrySelector.json';

storiesOf('Generic/CountrySelector', module)
  .add(
    'Country selector default',
    () => <CountrySelector list={countriesList} />,
    {
      info: { inline: false },
    }
  )
  .add(
    'Country selector with selected',
    () => <CountrySelector selected={countriesList[0]} list={countriesList} />,
    {
      info: { inline: false },
    }
  )
  .add(
    'Country selector with small flags',
    () => (
      <CountrySelector
        selected={countriesList[0]}
        list={countriesList}
        flagSize={'lg'}
      />
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Country selector with large flags',
    () => (
      <CountrySelector
        selected={countriesList[0]}
        list={countriesList}
        flagSize={'5x'}
      />
    ),
    {
      info: { inline: false },
    }
  );
