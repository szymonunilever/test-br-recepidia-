import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { RecipeAttributes, RecipeAttributesKeys } from '../index';
import toJson from 'enzyme-to-json';
import dataSource from '../../../mocks/recipe.json';
import content from '../../../mocks/recipeAttributes.json';

describe('<RecipeAttributes />', () => {
  let wrapper: ReactWrapper;
  const props: any = {
    recipe: {
      ...dataSource,
      creationTime: new Date(dataSource.creationTime),
    },
    visible: [
      RecipeAttributesKeys.serves,
      RecipeAttributesKeys.totalTime,
      RecipeAttributesKeys.preperationTime,
      RecipeAttributesKeys.difficulties,
    ],
    icons: {
      preparationTime: 'div',
      totalTime: 'div',
      serves: 'div',
      difficulties: 'div',
    },
    content,
  };

  beforeEach(() => {
    wrapper = mount(<RecipeAttributes {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
