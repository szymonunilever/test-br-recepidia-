import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Logo, LogoProps } from '../index';
import toJson from 'enzyme-to-json';

describe('<Logo />', () => {
  let wrapper: ReactWrapper;
  const props: LogoProps = {
    path: '/',
    icon: <div>Logo</div>,
  };

  beforeEach(() => {
    wrapper = mount(<Logo {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
