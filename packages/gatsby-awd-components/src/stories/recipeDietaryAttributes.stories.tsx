import React from 'react';
import { storiesOf } from '@storybook/react';
import { RecipeDietaryAttributes } from '../index';

import attributes from '../mocks/dietaryAttributes.json';
import activeAttributes from '../mocks/dietaryAttributesActive.json';
import { ReactComponent as InfoIcon } from 'src/svgs/inline/info.svg';
import { ReactComponent as VegeterianActive } from 'src/svgs//inline/nutrition-vegetarian-yes.svg';
import { ReactComponent as VegeterianInactive } from 'src/svgs/inline/nutrition-vegetarian-no.svg';
import { ReactComponent as VeganActive } from 'src/svgs/inline/nutrition-vegan-yes.svg';
import { ReactComponent as VeganInactive } from 'src/svgs/inline/nutrition-vegan-no.svg';
import { ReactComponent as NutFreeActive } from 'src/svgs/inline/nutrition-nut-free-yes.svg';
import { ReactComponent as NutFreeInactive } from 'src/svgs/inline/nutrition-nut-free-no.svg';
import { ReactComponent as PregnancySafeActive } from 'src/svgs/inline/nutrition-pregnancy-safe-yes.svg';
import { ReactComponent as PregnancySafeInactive } from 'src/svgs/inline/nutrition-pregnancy-safe-no.svg';
import { ReactComponent as GlutenFreeActive } from 'src/svgs/inline/nutrition-gluten-free-yes.svg';
import { ReactComponent as GlutenFreeInactive } from 'src/svgs/inline/nutrition-gluten-free-no.svg';
import { ReactComponent as LactoseFreeActive } from 'src/svgs/inline/nutrition-lactose-free-yes.svg';
import { ReactComponent as LactoseFreeInactive } from 'src/svgs/inline/nutrition-lactose-free-no.svg';
import { ReactComponent as RawFoodActive } from 'src/svgs/inline/nutrition-lactose-free-yes.svg';
import { ReactComponent as RawFoodInactive } from 'src/svgs/inline/nutrition-raw-food-no.svg';
import { ReactComponent as EggFreeActive } from 'src/svgs/inline/nutrition-egg-free-yes.svg';
import { ReactComponent as EggFreeInactive } from 'src/svgs/inline/nutrition-egg-free-no.svg';
import { ReactComponent as PaleoDietActive } from 'src/svgs/inline/nutrition-paleo-diet-yes.svg';
import { ReactComponent as PaleoDietInactive } from 'src/svgs/inline/nutrition-paleo-diet-no.svg';
import { ReactComponent as DairyFreeActive } from 'src/svgs/inline/nutrition-dairy-free-active.svg';
import { ReactComponent as DairyFreeInactive } from 'src/svgs/inline/nutrition-dairy-free-inactive.svg';
import { ReactComponent as WheatFreeActive } from 'src/svgs/inline/nutrition-wheat-free-active.svg';
import { ReactComponent as WheatFreeInactive } from 'src/svgs/inline/nutrition-wheat-free-inactive.svg';

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

storiesOf('Recipe related/RecipeDietaryAttributes', module).add(
  'defaultView',
  () => {
    return (
      <RecipeDietaryAttributes
        activeAttributes={activeAttributes as RMSData.Tag[]}
        showInactiveAttributes
        attributes={attributes}
        {...config}
      />
    );
  }
);
