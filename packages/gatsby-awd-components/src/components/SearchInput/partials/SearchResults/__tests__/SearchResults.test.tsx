import { mount } from 'enzyme';
import React from 'react';
import SearchResults from '../index';
import toJson from 'enzyme-to-json';
import searchData from '../../../../../mocks/search.json';

describe('<SearchResults />', () => {
  let wrapper: any;
  const props: any = {
    searchPagePath: '/search',
    activeIndex: 1,
    onClickHandler: jest.fn(),
    onHoverHandler: jest.fn(),
    navigateToItem: true,
    list: searchData.results,
  };

  beforeEach(() => {
    wrapper = mount(<SearchResults {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should show empty results', () => {
    wrapper = mount(<SearchResults {...props} list={[]} />);
    expect(wrapper.find('.search-input__item')).toHaveLength(0);
  });

  it('should have href in links', () => {
    wrapper = mount(<SearchResults {...props} navigateToItem={false} />);
    const text = wrapper
      .find('a')
      .first()
      .props().children;
    expect(
      wrapper
        .find('a')
        .first()
        .props().href
    ).toBe('/search?searchQuery=' + text);
  });

  it('should handle click on li', () => {
    wrapper
      .find('li')
      .at(8)
      .simulate('click');
    expect(props.onClickHandler).toHaveBeenCalled();
  });

  it('should handle hover on li', () => {
    wrapper
      .find('li')
      .at(8)
      .simulate('mouseenter');
    expect(props.onHoverHandler).toHaveBeenCalled();
  });
});
