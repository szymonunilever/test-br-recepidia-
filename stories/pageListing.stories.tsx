import React from 'react';
import { storiesOf } from '@storybook/react';

import pageListingData from '../src/components/data/pageListing.json';
import PageListing from '../src/components/lib/PageListing';

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

storiesOf('Components/PageListing/defaultView', module)
  .add('With loadmore button', () => {
    return <PageListing list={pageListingData} {...config} />;
  })
  .add('Without loadmore button', () => {
    const newConfig = {
      ...config,
      content: {
        ...config.content,
        cta: undefined,
      },
    };

    return <PageListing list={pageListingData} {...newConfig} />;
  })
  .add('Without loadmore button & without subtitle', () => {
    const newConfig = {
      ...config,
      content: {
        ...config.content,
        subtitle: undefined,
        cta: undefined,
      },
    };

    return <PageListing list={pageListingData} {...newConfig} />;
  });
