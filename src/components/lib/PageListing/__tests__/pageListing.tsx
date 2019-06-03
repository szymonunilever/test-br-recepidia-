/* global describe, it, expect */
import React from 'react';
import { mount } from 'enzyme';
import PageListing from '../PageListing';
import pageListingData from '../../../data/pageListing.json';

describe('<PageListing />', () => {
  it('Should recieve data', () => {
    const pageListing = mount(<PageListing data={pageListingData} />);

    expect(pageListing.props().data).toBeTruthy();
  });
});
