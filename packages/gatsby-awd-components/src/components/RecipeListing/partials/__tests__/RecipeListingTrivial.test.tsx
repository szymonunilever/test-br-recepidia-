import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import { RecipeListingTrivial } from '../index';
import { recipeListingTrivialPropsVariants as propsVariants } from '../../../../mocks/RecipeListing';

describe('<RecipeListingTrivial />', () => {
  let wrapper: ReactWrapper;
  it('matches the snapshot', () => {
    propsVariants.forEach(props => {
      wrapper = mount(<RecipeListingTrivial {...props} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
