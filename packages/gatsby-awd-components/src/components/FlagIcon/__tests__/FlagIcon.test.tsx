import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { FlagIcon } from '../index';
import toJson from 'enzyme-to-json';

describe('<FlagIcon />', () => {
  let wrapper: ReactWrapper;
  let props = {
    react: React,
    code: 'km',
  };

  beforeEach(() => {
    wrapper = mount(<FlagIcon {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
