import React from 'react';
import { storiesOf } from '@storybook/react';

import pageListingData from '../src/components/data/pageListing.json';
import PageListing from '../src/components/lib/PageListing/index';

storiesOf('Components/PageListing/defaultView', module)
  .add('With loadmore button', () => {
    return <PageListing data={pageListingData} />;
  })
  .add('Without loadmore button', () => {
    const newpageListingData = JSON.parse(JSON.stringify(pageListingData));

    newpageListingData.loadMoreButton.isEnabled = false;
    return <PageListing data={newpageListingData} />;
  })
  .add('Without loadmore button & without subtitle', () => {
    const newpageListingData = JSON.parse(JSON.stringify(pageListingData));

    newpageListingData.loadMoreButton.isEnabled = false;
    newpageListingData.subtitle = null;
    return <PageListing data={newpageListingData} />;
  });
