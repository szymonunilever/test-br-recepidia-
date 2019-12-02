import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { GlobalFooter, GlobalFooterProps } from '../index';
import toJson from 'enzyme-to-json';
import content from 'src/mocks/globalFooterMenu.json';

describe('<GlobalFooter />', () => {
  let wrapper: ReactWrapper;
  const props: GlobalFooterProps = {
    content: content,
  };

  beforeEach(() => {
    wrapper = mount(<GlobalFooter {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
