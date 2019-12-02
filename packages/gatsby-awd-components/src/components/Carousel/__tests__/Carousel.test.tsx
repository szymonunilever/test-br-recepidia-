import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Carousel } from '../index';
import toJson from 'enzyme-to-json';
import { CarouselProps } from '../models';

describe('<Carousel />', () => {
  let wrapper: ReactWrapper;
  const props: CarouselProps = {
    list: [1, 2, 3],
    // eslint-disable-next-line react/display-name
    createElementFunction: () => <div>123</div>,
    config: {},
  };

  beforeEach(() => {
    wrapper = mount(<Carousel {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
