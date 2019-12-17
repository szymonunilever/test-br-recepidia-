import { mount } from 'enzyme';
import React from 'react';
import { CountrySelector, CountrySelectorProps } from '../index';
import toJson from 'enzyme-to-json';

describe('<CountrySelector />', () => {
  let wrapper: any;
  const props: CountrySelectorProps = {
    list: [
      {
        value: 'en',
        label: 'en',
        path: 'en',
      },
    ],
  };

  beforeEach(() => {
    wrapper = mount(<CountrySelector {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should change language', () => {
    const windowOpen = jest.spyOn(window, 'open');
    wrapper.find('Select').prop('changeHandler')({ setDataValue: jest.fn() });
    expect(windowOpen).toHaveBeenCalled();
  });
});
