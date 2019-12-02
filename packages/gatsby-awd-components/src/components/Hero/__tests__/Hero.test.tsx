import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Hero, HeroProps } from '../index';
import toJson from 'enzyme-to-json';
import content from 'src/mocks/Hero.json';

describe('<Hero />', () => {
  let wrapper: ReactWrapper;
  const props: HeroProps = {
    viewType: 'Image',
    content,
    imageIsLink: false,
  };

  beforeEach(() => {
    wrapper = mount(<Hero {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should navigate to Primary CTA link', () => {
    // @ts-ignore
    // eslint-disable-next-line no-global-assign
    window = { location: { pathname: null } };
    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(window.location.pathname).toEqual('/');
  });

  it('Should navigate to Secondary CTA link', () => {
    // @ts-ignore
    // eslint-disable-next-line no-global-assign
    window = { location: { pathname: null } };
    wrapper
      .find('button')
      .last()
      .simulate('click');
    expect(window.location.pathname).toEqual('/');
  });

  it('Should navigate to Primary CTA link from image', () => {
    // @ts-ignore
    // eslint-disable-next-line no-global-assign
    window = { location: { pathname: null } };
    wrapper.find('.hero__image').simulate('click');
    expect(window.location.pathname).toEqual('/');
  });
});
