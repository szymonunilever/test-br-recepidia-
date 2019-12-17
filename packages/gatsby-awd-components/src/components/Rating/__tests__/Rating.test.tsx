import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Rating, RatingProps } from '../index';
import toJson from 'enzyme-to-json';
import { RatingAndReviewsProvider } from '../../../models';

xdescribe('<Rating />', () => {
  let wrapper: ReactWrapper;
  const props: RatingProps = {
    recipeId: 1,
    provider: RatingAndReviewsProvider.kritique,
    className: 'className'
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
