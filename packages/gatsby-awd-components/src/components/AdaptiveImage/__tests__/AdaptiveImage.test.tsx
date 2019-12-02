import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';

import { AdaptiveImage, AdaptiveImageProps } from '../index';
// eslint-disable-next-line no-undef
import LocalImage = Internal.LocalImage;
import { FluidObject } from 'gatsby-image';

describe('<AdaptiveImage />', () => {
  let wrapper: ReactWrapper;
  const fluid: FluidObject = {
    aspectRatio: 1,
    src: 'path',
    srcSet: 'path',
    sizes: 'string',
  };
  const localImage: LocalImage = {
    ext: '.svg',
    childImageSharp: {
      fluid: fluid,
      fixed: 'fixed',
    },
    fields: {
      publicURL: '/',
    },
  };
  let props: AdaptiveImageProps = {
    className: 'testClass',
    alt: 'Alt',
    localImage,
    sizes: 'size',
    view: 'view',
    link: '/',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    wrapper = mount(<AdaptiveImage {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render JPG image', () => {
    props = { ...props, localImage: { ...localImage, ext: '.jpg' } };
    wrapper = mount(<AdaptiveImage {...props} />);
    expect(wrapper.find('img').prop('sizes')).toBe('size');
  });

  it('should render empty element', () => {
    const props: any = {};
    wrapper = mount(<AdaptiveImage {...props} />);
    expect(wrapper.html()).toBe('');
  });
});
