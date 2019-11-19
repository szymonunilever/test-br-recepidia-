import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Arrow from '../Arrow';
import toJson from 'enzyme-to-json';
import { ArrowProps } from '../models';

describe('<Arrow />', () => {
  let wrapper: ReactWrapper;
  const props: ArrowProps = {
    clickFunction: () => {},
    icon: <div>Icon</div>,
  };

  beforeEach(() => {
    wrapper = mount(<Arrow {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
