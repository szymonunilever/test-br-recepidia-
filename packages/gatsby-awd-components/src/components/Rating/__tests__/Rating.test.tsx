import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Rating, RatingProps } from '../index';
import toJson from 'enzyme-to-json';

describe('<Rating />', () => {
  let wrapper: ReactWrapper;
  const props: RatingProps = {
    provider: 0,
    recipeId: 1,
  };

  beforeEach(() => {
    wrapper = mount(<Rating {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
