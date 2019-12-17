import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { recipeListingPropsVariants } from '../../../mocks/RecipeListing';
import { RecipeListing } from '../index';
import toJson from 'enzyme-to-json';

describe('<RecipeListing />', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<RecipeListing {...recipeListingPropsVariants.advanced} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('recipe list advanced Load More test', () => {
    expect(wrapper.find('.recipeCard').length).toBe(4);
    wrapper.find('.button.recipeList__loadMore').simulate('click');
    expect(wrapper.find('.recipeCard').length).toBe(8);
  });

  it('recipe list advanced Sorting test', () => {
    expect(wrapper.find('div.recipeCard__title').first().text()).toBe('Salada Francesa do @caio');
    wrapper
      .find('.react-dropdown-select.filter__sort')
      .first()
      .simulate('click');
    wrapper
      .find('div[role="list"]')
      .children()
      .at(4)
      .simulate('click');
    expect(wrapper.find('div.recipeCard__title').first().text()).toBe('Bolinho de Tapioca, carne e queijo da @crispimichele');
  });

  it('recipe list advanced Filtering test', () => {
    wrapper.find('button.filter__button').simulate('click');
    wrapper
      .find('.modal--filter .filter-settings .tags__list .button.tags__toggle')
      .first()
      .simulate('click');
    wrapper.find('.button.filterSettings__apply').simulate('click');
    expect(wrapper.find('div.recipeCard__title').length).toBe(0);
  });
});
