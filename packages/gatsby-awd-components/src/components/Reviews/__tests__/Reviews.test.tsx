import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Reviews, { ReviewsProps } from '../index';
import toJson from 'enzyme-to-json';
import { RatingAndReviewsProvider } from '../../../models/ratings&reviews';

describe('<Reviews />', () => {
  let wrapper: ReactWrapper;
  const reviewsProps: ReviewsProps = {
    provider: RatingAndReviewsProvider.kritique,
    className: 'test-class',
    recipeId: 123,
  };

  beforeEach(() => {
    wrapper = mount(<Reviews {...reviewsProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
