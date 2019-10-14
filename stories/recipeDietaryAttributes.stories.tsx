import React from 'react';
import { storiesOf } from '@storybook/react';
import { RecipeDietaryAttributes } from 'src/components/lib';

import attributes from 'src/components/data/dietaryAttributes.json';
import activeAttributes from 'src/components/data/dietaryAttributesActive.json';

import * as icons from 'src/svgs/attributes';

const config = {
  className: 'custom-class',
  icons: [
    {
      id: 11,
      active: <icons.VegeterianActive />,
      inActive: <icons.VegeterianInactive />,
    },
    {
      id: 10,
      active: <icons.VeganActive />,
      inActive: <icons.VeganInactive />,
    },
    {
      id: 5,
      active: <icons.NutFreeActive />,
      inActive: <icons.NutFreeInactive />,
    },
    {
      id: 7,
      active: <icons.PregnancySafeActive />,
      inActive: <icons.PregnancySafeInactive />,
    },
    {
      id: 3,
      active: <icons.GlutenFreeActive />,
      inActive: <icons.GlutenFreeInactive />,
    },
    {
      id: 4,
      active: <icons.LactoseFreeActive />,
      inActive: <icons.LactoseFreeInactive />,
    },
    {
      id: 8,
      active: <icons.RawFoodActive />,
      inActive: <icons.RawFoodInactive />,
    },
    {
      id: 2,
      active: <icons.EggFreeActive />,
      inActive: <icons.EggFreeInactive />,
    },
    {
      id: 6,
      active: <icons.PaleoDietActive />,
      inActive: <icons.PaleoDietInactive />,
    },
    {
      id: 1,
      active: <icons.DairyFreeActive />,
      inActive: <icons.DairyFreeInactive />,
    },
    {
      id: 9,
      active: <icons.WheatFreeActive />,
      inActive: <icons.WheatFreeInactive />,
    },
  ],
};

storiesOf('Components/RecipeDietaryAttributes', module).add(
  'defaultView',
  () => {
    return (
      <RecipeDietaryAttributes
        activeAttributes={activeAttributes}
        attributes={attributes}
        {...config}
      />
    );
  }
);
