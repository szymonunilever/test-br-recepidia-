import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { recipeListingPropsVariants } from '../../../mocks/RecipeListing';
import { RecipeListing } from '../index';
import toJson from 'enzyme-to-json';

describe('<RecipeListing />', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('matches the snapshot', () => {
    Object.values(recipeListingPropsVariants).forEach(props => {
      wrapper = mount(<RecipeListing {...props} />);
      expect(toJson(wrapper)).toMatchSnapshot();
      jest.clearAllMocks();
    });
  });

  it('recipe list advanced behavior test', () => {
    wrapper = mount(<RecipeListing {...recipeListingPropsVariants.advanced} />);

    // Load More
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('.button.recipeList__loadMore').simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('.button.recipeList__loadMore').simulate('click');
    wrapper.update();

    // Sorting
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

    // Filters
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

    // Favorite
    jest.clearAllMocks();
    wrapper = mount(<RecipeListing {...recipeListingPropsVariants.advanced} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper
      .find('button.recipeCard__favorite')
      .at(1)
      .simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('recipe carousel behavior test', () => {
    wrapper = mount(
      <RecipeListing {...recipeListingPropsVariants.carouselWithFavorites} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('button.slide-arrow.right').simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find('button.slide-arrow.left').simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper
      .find('button.recipeCard__favorite')
      .at(1)
      .simulate('click');
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
