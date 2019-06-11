import React from 'react';
import { storiesOf } from '@storybook/react';

import GlobalNavigation from './components/lib/GlobalNavigation/index';

const config = {
  content: '',
  prop: 'val',
};

storiesOf('Components/GlobalNavigation', module).add(
  'With loadmore button',
  () => {
    return <GlobalNavigation list={[]} {...config} />;
  }
);
