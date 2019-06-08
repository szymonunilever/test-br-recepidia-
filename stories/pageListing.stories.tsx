import React from 'react';
import { storiesOf } from '@storybook/react';

import pageListingData from '../src/components/data/pageListing.json';
import PageListing from '../src/components/lib/PageListing';

storiesOf('Components/PageListing/defaultView', module)
  .add('With loadmore button', () => {
    return <PageListing data={pageListingData} />;
  })
  .add('Without loadmore button', () => {
    const newData = {
      ...pageListingData,
      loadMoreButton: { ...pageListingData.loadMoreButton, isEnabled: false },
    };

    return <PageListing data={newData} />;
  })
  .add('Without loadmore button & without subtitle', () => {
    const newData = {
      ...pageListingData,
      subtitle: undefined,
      loadMoreButton: { ...pageListingData.loadMoreButton, isEnabled: false },
    };

    return <PageListing data={newData} />;
  });
