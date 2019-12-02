import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { RecipeCookingMethod, RecipeCookingMethodProps } from '../index';
import toJson from 'enzyme-to-json';
import recipe from '../../../mocks/recipe.json';

describe('<RecipeCookingMethod />', () => {
  let wrapper: ReactWrapper;
  const methodList: RMSData.CookingMethodGroup[] = recipe.methods;
  const props: RecipeCookingMethodProps = {
    methodList,
    content: { title: 'Title', subtitle: 'Subtitle' },
  };

  beforeEach(() => {
    wrapper = mount(<RecipeCookingMethod {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("shouldn't render methods", () => {
    wrapper = mount(<RecipeCookingMethod methodList={[]} content={{}} />);
    expect(wrapper.find('.cooking-methods__group')).toHaveLength(0);
  });
});
