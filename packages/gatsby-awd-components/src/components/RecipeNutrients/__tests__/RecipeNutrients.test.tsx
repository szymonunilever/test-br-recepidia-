import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import RecipeNutrients, { RecipeNutrientsProps } from '../index';
import toJson from 'enzyme-to-json';
import { RecipeNutrientsViewType } from '../models';
import { recipe, content } from '../../../stories/recipeNutrients.stories';

describe('<RecipeNutrients />', () => {
  let wrapper: ReactWrapper;
  const recipeNutrientsProps: RecipeNutrientsProps = {
    viewType: RecipeNutrientsViewType.Base,
    // @ts-ignore
    recipe: {
      ...recipe,
    },
    content,
  };

  beforeEach(() => {
    wrapper = mount(<RecipeNutrients {...recipeNutrientsProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
