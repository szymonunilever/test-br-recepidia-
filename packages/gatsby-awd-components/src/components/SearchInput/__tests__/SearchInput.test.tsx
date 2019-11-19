import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import SearchInput from '../index';
import toJson from 'enzyme-to-json';
import searchData from '../../../mocks/search.json';
import { KeyCode } from '../../constants';

const e = { target: { value: '1234567890!!!' } };
const generateEvent = (e: any) => ({
  preventDefault: () => {},
  key: e,
  keyCode: KeyCode[e],
  which: KeyCode[e],
});

describe('<SearchInput />', () => {
  let wrapper: ReactWrapper;
  const props: any = {
    labelIcon: <div>Icon</div>,
    buttonResetIcon: <div>Search</div>,
    onSubmit: () => Promise.resolve({ json: () => searchData.results }),
    debounceTimeout: 0,
    content: {
      title: 'Title',
      placeholderText: 'Search...',
    },
    searchResults: searchData,
    list: searchData.results,
  };

  beforeEach(() => {
    wrapper = mount(<SearchInput {...props} />);
    const input = wrapper.find('input');
    input.simulate('change', { ...e });
    wrapper.update();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should handle Enter keyDown', () => {
    const input = wrapper.find('input');
    input.simulate('keyDown', generateEvent('Enter'));
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should reset form by click', () => {
    wrapper.find('button.form__button-reset').simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
