import React from 'react';
import { storiesOf } from '@storybook/react';

import pageListingData from '../src/components/data/pageListing.json';
import PageListing from '../src/components/lib/components/PageListing';
import { PageListingProps } from '../src/components/lib/components/PageListing/models';

const page = {
  maxWidth: '1090px',
};

const config: PageListingProps = {
  content: {
    title: 'What we offer',
    // subtitle: 'Custom subtitle',
    cta: {
      label: 'Custom button text',
    },
  },
  list: pageListingData,
  className: 'custom-class',
  viewType: 'default',
  initialCount: 6,
  pagesPerLoad: 6,
};

storiesOf('Components/PageListing/defaultView', module).add('Default', () => {
  const newConfig = {
    ...config,
    content: {
      ...config.content,
      subtitle: undefined,
      cta: undefined,
    },
  };

  return (
    <div style={page}>
      <PageListing {...newConfig} />
    </div>
  );
});
