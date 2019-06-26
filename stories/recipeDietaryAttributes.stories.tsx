import React from 'react';
import { storiesOf } from '@storybook/react';
import RecipeDietaryAttributes from 'src/components/lib/components/RecipeDietaryAttributes';

import attributes from 'src/components/data/dietaryAttributes.json';
import activeAttributes from 'src/components/data/dietaryAttributesActive.json';

import * as icons from 'src/svgs/attributes';

const config = {
  className: 'custom-class',
  icons: [
    {
      id: 'vegetarian',
      active: <icons.VegeterianActive />,
      inActive: <icons.VegeterianInactive />,
    },
    {
      id: 'vegan',
      active: <icons.VeganActive />,
      inActive: <icons.VeganInactive />,
    },
    {
      id: 'nutFree',
      active: <icons.NutFreeActive />,
      inActive: <icons.NutFreeInactive />,
    },
    {
      id: 'pregnancySafe',
      active: <icons.PregnancySafeActive />,
      inActive: <icons.PregnancySafeInactive />,
    },
    {
      id: 'glutenFree',
      active: <icons.GlutenFreeActive />,
      inActive: <icons.GlutenFreeInactive />,
    },
    {
      id: 'lactoseFree',
      active: <icons.LactoseFreeActive />,
      inActive: <icons.LactoseFreeInactive />,
    },
    {
      id: 'rawFood',
      active: <icons.RawFoodActive />,
      inActive: <icons.RawFoodInactive />,
    },
    {
      id: 'eggFree',
      active: <icons.EggFreeActive />,
      inActive: <icons.EggFreeInactive />,
    },
    {
      id: 'paleoFree',
      active: <icons.PaleoDietActive />,
      inActive: <icons.PaleoDietInactive />,
    },
    {
      id: 'wheatFree',
    },
    {
      id: 'dairyProductFree',
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
