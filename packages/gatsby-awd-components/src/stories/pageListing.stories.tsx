import React from 'react';
import { storiesOf } from '@storybook/react';

import pageListingData from '../mocks/pageListing.json';

import { PageListing, PageListingProps, PageListingViewTypes } from '../index';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';

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
const pagesContents = {
  title: 'Custom title text',
  subtitle: 'Custom subtitle',
  cta: {
    label: 'Custom button text',
  },
};

storiesOf('Generic/PageListing', module)
  .add('Default', () => {
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
  })
  .add(
    'Carousel',
    () => (
      <PageListing
        list={pageListingData}
        content={pagesContents}
        viewType={PageListingViewTypes.carousel}
        initialCount={4}
        carouselConfig={{
          breakpoints: [
            {
              width: 1366,
              switchElementsBelowBreakpoint: 1,
              switchElementsAfterBreakpoint: 2,
              visibleElementsBelowBreakpoint: 2,
              visibleElementsAboveBreakpoint: 4,
            },
          ],
          arrowIcon: <ArrowIcon />,
        }}
      />
    ),
    { inline: false }
  );
