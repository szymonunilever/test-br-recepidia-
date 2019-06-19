import React from 'react';
import { storiesOf } from '@storybook/react';
import RecipeDietaryAttributes from 'src/components/lib/RecipeDietaryAttributes';

const config = {
  content: {
    title: 'Custom title text',
    subtitle: 'Custom subtitle',
    cta: {
      label: 'Custom button text',
    },
  },
  className: 'custom-class',
  viewType: 'default',
  initialCount: 2,
  pagesPerLoad: 1,
};

storiesOf('Components/RecipeDietaryAttributes', module).add(
  'defaultView',
  () => {
    return <RecipeDietaryAttributes />;
  }
);
