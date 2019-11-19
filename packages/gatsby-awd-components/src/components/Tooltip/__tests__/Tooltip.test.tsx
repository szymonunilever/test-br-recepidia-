import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Tooltip, { TooltipProps } from '../index';
import toJson from 'enzyme-to-json';

describe('<Tooltip />', () => {
  let wrapper: ReactWrapper;
  // @ts-ignore
  const tooltipProps: TooltipProps = {
    className: 'test-class',
    // children: [],
    overlay: 'some test info',
  };

  beforeEach(() => {
    wrapper = mount(
      <Tooltip {...tooltipProps}>
        <div>test123</div>
      </Tooltip>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
