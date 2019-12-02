import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import ProgressBar from '../ProgressBar';
import toJson from 'enzyme-to-json';

describe('<ProgressBar />', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<ProgressBar />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
