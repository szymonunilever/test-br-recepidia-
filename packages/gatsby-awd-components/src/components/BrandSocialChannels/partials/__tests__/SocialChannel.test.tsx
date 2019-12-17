import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import SocialChannel from '../index';
import toJson from 'enzyme-to-json';
import { SocialChannelProps } from '../models';

describe('<SocialChannel />', () => {
  let wrapper: ReactWrapper;
  const props: SocialChannelProps = {
    label: 'Facebook',
    url: '/',
    icon: <div>Facebook</div>,
    attributes: {
      title: 'Facebook',
    },
  };

  beforeEach(() => {
    wrapper = mount(<SocialChannel {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
