import { storiesOf } from '@storybook/react';
import React from 'react';
import { CountrySelector } from '../src/components/lib/components/CountrySelector';
import { LanguageEntry } from 'src/components/lib/components/CountrySelector/models';

const list: LanguageEntry[] = [
  {
    value: 'Argentina',
    label: 'AR',
    path: 'path/to/argentina/page',
    icon: '&#x1f30e;',
  },
  {
    value: 'Bolivia',
    label: 'BO',
    path: 'path/to/bolivia/page',
    icon: '&#x1f30e;',
  },
  {
    value: 'Brazil',
    label: 'BR',
    path: 'path/to/brazil/page',
    icon: '&#x1f30e;',
  },
  {
    value: 'Colombia',
    label: 'CO',
    path: 'path/to/colombia/page',
    icon: '&#x1f30e;',
  },
  {
    value: 'Chile',
    label: 'CL',
    path: 'path/to/chile/page',
    icon: '&#x1f30e;',
  },
  {
    value: 'Mexico',
    label: 'MX',
    path: 'path/to/mexico/page',
    icon: '&#x1f30e;',
  },
  {
    value: 'Paraguay',
    label: 'PY',
    path: 'path/to/paraguay/page',
    icon: '&#x1f30e;',
  },
  {
    value: 'Puerto rico',
    label: 'PR',
    path: 'path/to/puerto-rico/page',
    icon: '&#x1f30e;',
  },
  {
    value: 'Rep. Dominicana',
    label: 'DO',
    path: 'path/to/domimicana/page',
    icon: '&#x1f30e;',
  },
  {
    value: 'URUGUAY',
    label: 'UY',
    path: 'path/to/uruguay/page',
    icon: '&#x1f30e;',
  },
];
storiesOf('Components/CountrySelector', module)
  .add('Country selector default', () => <CountrySelector list={list} />, {
    info: { inline: false },
  })
  .add(
    'Country selector with selected',
    () => <CountrySelector selected={list[0]} list={list} />,
    {
      info: { inline: false },
    }
  );
