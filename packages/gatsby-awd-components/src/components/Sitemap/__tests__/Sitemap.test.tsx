import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Sitemap, { SitemapProps } from '../index';
import toJson from 'enzyme-to-json';
import { content } from '../../../stories/sitemap.stories';

describe('<Sitemap />', () => {
  let wrapper: ReactWrapper;
  const sitemapProps: SitemapProps = {
    content,
  };

  beforeEach(() => {
    wrapper = mount(<Sitemap {...sitemapProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
