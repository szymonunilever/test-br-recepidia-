/* global describe, it, expect */
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import { ReactComponent as Icon } from 'src/svgs/inline/plus.svg';
import { ButtonViewType } from '../../Button';
import { BackToTop } from '../index';

const content: AppContent.BackToTopContent = {
  label: 'Back to top',
};

describe('Back to top', () => {
  it('Render with text', () => {
    const wrapper: ShallowWrapper = shallow(<BackToTop content={content} />);
    expect(wrapper.find('button[data-componentname="button"]')).toBeTruthy();
  });

  it('Render with Icon', () => {
    const wrapper: ReactWrapper = mount(
      <BackToTop content={content} Icon={Icon} viewType={ButtonViewType.icon} />
    );

    expect(wrapper.find('button[data-componentname="button"]')).toBeTruthy();
    expect(wrapper.find('svg'));
  });
  // TODO: write test for scroll functionality
});
