import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import {
  recipeCardPropVariants as propVariants,
} from '../../../mocks/RecipeListing';
import {RecipeCard} from '../index';

describe('<RecipeCard />', () => {
  let wrapper: ReactWrapper;
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('matches the snapshot', () => {
    propVariants.forEach(props => {
      wrapper = mount(<RecipeCard {...props} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
