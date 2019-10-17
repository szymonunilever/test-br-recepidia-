import React from 'react';
import { storiesOf } from '@storybook/react';
import { RecipeDietaryAttributes } from '../index';

import attributes from './mocks/dietaryAttributes.json';
import activeAttributes from './mocks/dietaryAttributesActive.json';
import { ReactComponent as InfoIcon } from './svgs/inline/info.svg';
import { ReactComponent as VegeterianActive } from './svgs//inline/nutrition-vegetarian-yes.svg';
import { ReactComponent as VegeterianInactive } from './svgs/inline/nutrition-vegetarian-no.svg';
import { ReactComponent as VeganActive } from './svgs/inline/nutrition-vegan-yes.svg';
import { ReactComponent as VeganInactive } from './svgs/inline/nutrition-vegan-no.svg';
import { ReactComponent as NutFreeActive } from './svgs/inline/nutrition-nut-free-yes.svg';
import { ReactComponent as NutFreeInactive } from './svgs/inline/nutrition-nut-free-no.svg';
import { ReactComponent as PregnancySafeActive } from './svgs/inline/nutrition-pregnancy-safe-yes.svg';
import { ReactComponent as PregnancySafeInactive } from './svgs/inline/nutrition-pregnancy-safe-no.svg';
import { ReactComponent as GlutenFreeActive } from './svgs/inline/nutrition-gluten-free-yes.svg';
import { ReactComponent as GlutenFreeInactive } from './svgs/inline/nutrition-gluten-free-no.svg';
import { ReactComponent as LactoseFreeActive } from './svgs/inline/nutrition-lactose-free-yes.svg';
import { ReactComponent as LactoseFreeInactive } from './svgs/inline/nutrition-lactose-free-no.svg';
import { ReactComponent as RawFoodActive } from './svgs/inline/nutrition-lactose-free-yes.svg';
import { ReactComponent as RawFoodInactive } from './svgs/inline/nutrition-raw-food-no.svg';
import { ReactComponent as EggFreeActive } from './svgs/inline/nutrition-egg-free-yes.svg';
import { ReactComponent as EggFreeInactive } from './svgs/inline/nutrition-egg-free-no.svg';
import { ReactComponent as PaleoDietActive } from './svgs/inline/nutrition-paleo-diet-yes.svg';
import { ReactComponent as PaleoDietInactive } from './svgs/inline/nutrition-paleo-diet-no.svg';
import { ReactComponent as DairyFreeActive } from './svgs/inline/nutrition-dairy-free-active.svg';
import { ReactComponent as DairyFreeInactive } from './svgs/inline/nutrition-dairy-free-inactive.svg';
import { ReactComponent as WheatFreeActive } from './svgs/inline/nutrition-wheat-free-active.svg';
import { ReactComponent as WheatFreeInactive } from './svgs/inline/nutrition-wheat-free-inactive.svg';

const config = {
  className: 'custom-class',
  icons: [
    {
      id: 11,
      active: <VegeterianActive />,
      inActive: <VegeterianInactive />,
    },
    {
      id: 10,
      active: <VeganActive />,
      inActive: <VeganInactive />,
    },
    {
      id: 5,
      active: <NutFreeActive />,
      inActive: <NutFreeInactive />,
    },
    {
      id: 7,
      active: <PregnancySafeActive />,
      inActive: <PregnancySafeInactive />,
    },
    {
      id: 3,
      active: <GlutenFreeActive />,
      inActive: <GlutenFreeInactive />,
    },
    {
      id: 4,
      active: <LactoseFreeActive />,
      inActive: <LactoseFreeInactive />,
    },
    {
      id: 8,
      active: <RawFoodActive />,
      inActive: <RawFoodInactive />,
    },
    {
      id: 2,
      active: <EggFreeActive />,
      inActive: <EggFreeInactive />,
    },
    {
      id: 6,
      active: <PaleoDietActive />,
      inActive: <PaleoDietInactive />,
    },
    {
      id: 1,
      active: <DairyFreeActive />,
      inActive: <DairyFreeInactive />,
    },
    {
      id: 9,
      active: <WheatFreeActive />,
      inActive: <WheatFreeInactive />,
    },
  ],
  infoIcon: <InfoIcon />,
};

storiesOf('Components/RecipeDietaryAttributes', module).add(
  'defaultView',
  () => {
    return (
      <RecipeDietaryAttributes
        activeAttributes={activeAttributes}
        showInactiveAttributes
        attributes={attributes}
        {...config}
      />
    );
  }
);
