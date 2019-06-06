/* global describe, it, expect */
import React from 'react';
import { shallow, mount } from 'enzyme';

import pageListingData from '../../../data/pageListing.json';

import PageListing from '../PageListing';
import LoadMoreButton from '../partials/LoadMoreButton';

describe('<PageListing />', () => {
  it('Should render custom class', () => {
    const newData = {
      ...pageListingData,
      customClass: 'my-custom-class',
    };
    const wrapper = shallow(<PageListing data={newData} />);

    expect(
      wrapper.find('.page-listing').hasClass('my-custom-class')
    ).toBeTruthy();
  });

  it('Should render subtitle if it`s been passed', () => {
    const newData = {
      ...pageListingData,
      subtitle: 'custom subtitle',
    };
    const wrapper = shallow(<PageListing data={newData} />);

    expect(wrapper.find('.page-listing__subtitle').text()).toEqual(
      'custom subtitle'
    );
  });

  it('Should not render subtitle if it`s not been passed', () => {
    const newData = {
      ...pageListingData,
      subtitle: undefined,
    };
    const wrapper = shallow(<PageListing data={newData} />);

    expect(wrapper.exists('.page-listing__subtitle')).toBeFalsy();
  });

  it('Should render <PageListingItem/>', () => {
    const newData = {
      ...pageListingData,
    };
    const wrapper = shallow(<PageListing data={newData} />);

    expect(wrapper.find('PageListingItem').exists()).toBeTruthy();
  });

  it('Should render <PageListingItem/> specified count', () => {
    const newData = {
      ...pageListingData,
      pagesCount: 3,
    };
    const wrapper = shallow(<PageListing data={newData} />);

    expect(wrapper.find('PageListingItem')).toHaveLength(newData.pagesCount);
  });

  it('Should render <LoadMoreButton/> if it`s been enabled', () => {
    const newData = {
      ...pageListingData,
      loadMoreButton: {
        ...pageListingData.loadMoreButton,
        isEnabled: true,
      },
    };

    const wrapper = shallow(<PageListing data={newData} />);

    expect(wrapper.find('LoadMoreButton').exists()).toBeTruthy();
  });

  it('Should not render <LoadMoreButton/> if it`s not been enabled', () => {
    const newData = {
      ...pageListingData,
      loadMoreButton: {
        ...pageListingData.loadMoreButton,
        isEnabled: false,
      },
    };
    const wrapper = shallow(<PageListing data={newData} />);

    expect(wrapper.find('LoadMoreButton').exists()).toBeFalsy();
  });

  it('Should render <LoadMoreButton/> if it`s been enabled and it has pages to load more', () => {
    const newData = {
      ...pageListingData,
      pagesCount: 2,
      loadMoreButton: {
        ...pageListingData.loadMoreButton,
        isEnabled: true,
      },
    };

    const wrapper = shallow(<PageListing data={newData} />);
    if (newData.pages.length > newData.pagesCount) {
      expect(wrapper.find('LoadMoreButton').exists()).toBeTruthy();
    }
  });

  it('Should not render <LoadMoreButton/> if it`s been enabled but it has no pages to load more', () => {
    const newData = {
      ...pageListingData,
      pages: [],
      pagesCount: 2,
      loadMoreButton: {
        ...pageListingData.loadMoreButton,
        isEnabled: true,
      },
    };

    const wrapper = shallow(<PageListing data={newData} />);

    expect(wrapper.find('LoadMoreButton').exists()).toBeFalsy();
  });

  it('Should render <PageListingItem/> after <LoadMoreButton/> has been clicked', () => {
    const newData = {
      ...pageListingData,
      pagesCount: 2,
    };

    const pageListingWrapper = mount(<PageListing data={newData} />);

    const pageListingItemRendered = pageListingWrapper.find('PageListingItem')
      .length;

    pageListingWrapper.find('.page-listing__button').simulate('click');

    expect(pageListingWrapper.find('PageListingItem').length).toBeGreaterThan(
      pageListingItemRendered
    );
  });

  it('Should render specific count of <PageListingItem/> after <LoadMoreButton/> has been clicked', () => {
    const newData = {
      ...pageListingData,
      loadMoreButton: {
        ...pageListingData.loadMoreButton,
        pagesPerLoad: 2,
      },
    };

    const pageListingWrapper = mount(<PageListing data={newData} />);

    const pageListingItemRendered = pageListingWrapper.find('PageListingItem')
      .length;

    pageListingWrapper.find('.page-listing__button').simulate('click');

    expect(pageListingWrapper.find('PageListingItem').length).toEqual(
      pageListingItemRendered + newData.loadMoreButton.pagesPerLoad
    );
  });
});
