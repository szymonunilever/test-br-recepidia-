import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Select, { SelectProps } from '../index';
import toJson from 'enzyme-to-json';
import selectOptions from '../../../mocks/select.json';

describe('<Select />', () => {
  let wrapper: ReactWrapper;
  const selectProps: SelectProps = {
    options: selectOptions.options,
    defaultValue: '1',
    input: {
      onChange: jest.fn(),
    },
    changeHandler: val => console.log('val selected', val),
  };

  beforeEach(() => {
    wrapper = mount(<Select {...selectProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
