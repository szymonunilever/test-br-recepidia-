import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { CheckElem, CheckElemProps } from '../index';
import toJson from 'enzyme-to-json';

describe('<CheckElem />', () => {
  let wrapper: ReactWrapper;
  const props: CheckElemProps = {
    type: 1,
    value: 'checkbox',
  };

  const propsRadio: CheckElemProps = {
    type: 0,
    value: 'radio',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    wrapper = mount(<CheckElem {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render radio', () => {
    wrapper = mount(<CheckElem {...propsRadio} />);
    expect(wrapper.find('input').prop('type')).toBe('radio');
  });
});
