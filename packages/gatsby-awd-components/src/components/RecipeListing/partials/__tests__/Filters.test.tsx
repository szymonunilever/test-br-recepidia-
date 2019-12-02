import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import {
  tags as allFilters,
  filtersContentVariants,
  icons,
} from '../../../../mocks/RecipeListing';
import Filter from '../Filters';
const onChangeSorting = jest.fn();
const onChangeFilter = jest.fn();
const props = {
  content: filtersContentVariants[1],
  allFilters,
  onChangeFilter,
  onChangeSorting,
  results: 4,
  icons,
  sortSelectPlaceholder: 'Sort by',
  dataFetched: true,
};

describe('<Filter />', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    filtersContentVariants.forEach(content => {
      wrapper = mount(
        <Filter
          {...{
            content,
            allFilters,
            onChangeFilter,
            onChangeSorting,
            results: 4,
            icons,
            sortSelectPlaceholder: 'Sort by',
          }}
        />
      );
      expect(toJson(wrapper)).toMatchSnapshot();
      jest.clearAllMocks();
    });
    wrapper = mount(<Filter {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    jest.clearAllMocks();

    wrapper = mount(<Filter {...{ ...props, results: 1 }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('change sorting', () => {
    wrapper = mount(<Filter {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper
      .find('.react-dropdown-select.filter__sort')
      .first()
      .simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper
      .find('div[role="list"]')
      .children()
      .at(2)
      .simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('work with filter tags', () => {
    wrapper = mount(<Filter {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('button.filter__button').simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper
      .find('.modal--filter .filter-settings .tags__list .button.tags__toggle')
      .at(1)
      .simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper
      .find('.modal--filter .filter-settings .tags__list .button.tags__toggle')
      .at(2)
      .simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('.button.filterSettings__apply').simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper
      .find(
        '.tags .tags__list .tags__item .tags__removable .button.tags__removableButton'
      )
      .at(1)
      .simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('button.filter__button').simulate('click');
    wrapper.update();
    wrapper.find('.button.filterSettings__reset').simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
