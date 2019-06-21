import React from 'react';
import { storiesOf } from '@storybook/react';
import RecipeDietaryAttributes from 'src/components/lib/RecipeDietaryAttributes';
import listAttributes from 'src/components/data/dietaryAttributes.json';
import listActiveAttributes from 'src/components/data/dietaryAttributesActive.json';

import VegeterianActive from 'src/svgs/inline/nutrition-vegetarian-yes.svg';
import VegeterianInactive from 'src/svgs/inline/nutrition-vegetarian-no.svg';

import VeganActive from 'src/svgs/inline/nutrition-vegan-yes.svg';
import VeganInactive from 'src/svgs/inline/nutrition-vegan-no.svg';

import NutFreeActive from 'src/svgs/inline/nutrition-nut-free-yes.svg';
import NutFreeInactive from 'src/svgs/inline/nutrition-nut-free-no.svg';

import PregnancySafeActive from 'src/svgs/inline/nutrition-pregnancy-safe-yes.svg';
import PregnancySafeInactive from 'src/svgs/inline/nutrition-pregnancy-safe-no.svg';

import GlutenFreeActive from 'src/svgs/inline/nutrition-gluten-free-yes.svg';
import GlutenFreeInactive from 'src/svgs/inline/nutrition-gluten-free-no.svg';

import LactoseFreeActive from 'src/svgs/inline/nutrition-lactose-free-yes.svg';
import LactoseFreeInactive from 'src/svgs/inline/nutrition-lactose-free-no.svg';

import RawFoodActive from 'src/svgs/inline/nutrition-lactose-free-yes.svg';
import RawFoodInactive from 'src/svgs/inline/nutrition-raw-food-no.svg';

import EggsFreeActive from 'src/svgs/inline/nutrition-egg-free-yes.svg';
import EggsFreeInactive from 'src/svgs/inline/nutrition-egg-free-no.svg';

import PaleoDietActive from 'src/svgs/inline/nutrition-paleo-diet-yes.svg';
import PaleoDietInactive from 'src/svgs/inline/nutrition-paleo-diet-no.svg';

const config = {
  content: {
    title: 'Custom title text',
    subtitle: 'Custom subtitle',
    cta: {
      label: 'Custom button text',
    },
  },
  className: 'custom-class',
  listIcons: [
    {
      id: 1,
      active: <VegeterianActive />,
      inActive: <VegeterianInactive />,
    },
    {
      id: 2,
      active: <VeganActive />,
      inActive: <VeganInactive />,
    },
    {
      id: 3,
      active: <NutFreeActive />,
      inActive: <NutFreeInactive />,
    },
    {
      id: 4,
      active: <PregnancySafeActive />,
      inActive: <PregnancySafeInactive />,
    },
    {
      id: 5,
      active: <GlutenFreeActive />,
      inActive: <GlutenFreeInactive />,
    },
    {
      id: 6,
      active: <LactoseFreeActive />,
      inActive: <LactoseFreeInactive />,
    },
    {
      id: 7,
      active: <RawFoodActive />,
      inActive: <RawFoodInactive />,
    },
    {
      id: 8,
      active: <EggsFreeActive />,
      inActive: <EggsFreeInactive />,
    },
    {
      id: 10,
      active: <PaleoDietActive />,
      inActive: <PaleoDietInactive />,
    },
  ],
};

storiesOf('Components/RecipeDietaryAttributes', module).add(
  'defaultView',
  () => {
    return (
      <RecipeDietaryAttributes
        listActiveAttributes={listActiveAttributes}
        listAttributes={listAttributes}
        {...config}
      />
    );
  }
);
