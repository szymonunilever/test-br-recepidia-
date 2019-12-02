import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { PageListing, PageListingProps } from '../index';
import toJson from 'enzyme-to-json';
import list from 'src/mocks/pageListing.json';

describe('<PageListing />', () => {
  let wrapper: ReactWrapper;
  const props: PageListingProps = {
    list,
    viewType: 1,
    initialCount: 4,
    content: {
      title: 'Custom title text',
      subtitle: 'Custom subtitle',
      cta: {
        label: 'Custom button text',
      },
    },
    carouselConfig: {
      breakpoints: [
        {
          width: 1366,
          switchElementsBelowBreakpoint: 1,
          switchElementsAfterBreakpoint: 2,
          visibleElementsBelowBreakpoint: 2,
          visibleElementsAboveBreakpoint: 4,
        },
      ],
      arrowIcon: <div>Icon</div>,
    },
  };

  beforeEach(() => {
    wrapper = mount(<PageListing {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
