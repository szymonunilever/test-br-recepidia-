import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';
import {
  recipeCardPropVariants as propVariants,
  recipeCardPropsDefault as propsDefault,
} from '../../../../mocks/RecipeListing';
import {RecipeCard} from '../../../RecipeCard';

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
  it('test click on favorite', () => {
    let testRecipeId = 0;
    let testVal = false;
    const onFavoriteChange = (res: { recipeId: number; val: boolean }) => {
      testRecipeId = res.recipeId;
      testVal = res.val;
    };
    wrapper = mount(
      <RecipeCard
        {...{ ...propsDefault, onFavoriteChange, enableSelectFavorite: true }}
      />
    );
    wrapper.find('button.recipe-card__favorite').simulate('click');
    expect(testVal).toEqual(true);
    expect(testRecipeId).toEqual(propsDefault.recipeId);
  });
});
