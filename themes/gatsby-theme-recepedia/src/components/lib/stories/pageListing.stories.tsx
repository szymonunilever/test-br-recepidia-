import React from 'react';
import { storiesOf } from '@storybook/react';

import pageListingData from './mocks/pageListing.json';
import { PageListing, PageListingProps } from '../index';

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
