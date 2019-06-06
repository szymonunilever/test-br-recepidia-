/* global describe, it, expect, jest */
import React from 'react';
import { shallow } from 'enzyme';
import LoadMoreButton from '../LoadMoreButton';

describe('<LoadMoreButtom />', () => {
  const loadMoreButtonProps = {
    loadMore() {},
    loadMoreButton: {
      pagesPerLoad: 4,
      isEnabled: true,
      text: 'Custom text',
    },
  };

  it('Should render custom text for loadMoreButton', () => {
    const newLoadMoreButtonProps = {
      ...loadMoreButtonProps,
      loadMoreButton: {
        ...loadMoreButtonProps.loadMoreButton,
        text: 'Custom text',
      },
    };

    const wrapper = shallow(<LoadMoreButton {...newLoadMoreButtonProps} />);

    expect(
      wrapper.find('.page-listing__button').contains('Custom text')
    ).toBeTruthy();
  });

  it('Should handle click and call loadMore function', () => {
    const loadMore = jest.fn(() => {});

    const newLoadMoreButtonProps = {
      ...loadMoreButtonProps,
      loadMore,
    };

    const wrapper = shallow(<LoadMoreButton {...newLoadMoreButtonProps} />);

    wrapper.find('.page-listing__button').simulate('click');

    expect(newLoadMoreButtonProps.loadMore).toHaveBeenCalled();
  });
});
