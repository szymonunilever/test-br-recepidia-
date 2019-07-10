import { storiesOf } from '@storybook/react';
import React from 'react';
import { CountrySelector } from '../src/components/lib/components/CountrySelector';
import countriesList from 'src/components/data/countrySelector.json';

storiesOf('Components/CountrySelector', module)
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
  );
