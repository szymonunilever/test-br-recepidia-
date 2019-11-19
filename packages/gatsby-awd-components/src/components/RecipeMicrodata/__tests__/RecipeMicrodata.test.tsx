import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { RecipeMicrodata } from '../index';
import toJson from 'enzyme-to-json';
import recipe from 'src/mocks/recipe.json';

describe('<RecipeMicrodata />', () => {
  let wrapper: ReactWrapper;
  const props: any = {
    recipe,
  };

  beforeEach(() => {
    wrapper = mount(<RecipeMicrodata {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
