/* global describe, it, expect */
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
// @ts-ignore
import Icon from 'src/svgs/inline/plus.svg';
import { ButtonViewType } from '../../common/Button';
import { BackToTop } from '../index';

describe('Back to top', () => {
  it('Render with text', () => {
    const wrapper: ShallowWrapper = shallow(<BackToTop>Back to top</BackToTop>);
    expect(wrapper.find('button[data-componentname="button"]')).toBeTruthy();
  });
  it('Render with icon', () => {
    const wrapper: ReactWrapper = mount(
      <BackToTop icon={<Icon />} viewType={ButtonViewType.icon} />
    );
    expect(wrapper.find('button[data-componentname="button"]')).toBeTruthy();
    expect(wrapper.find('svg'));
  });
  // TODO: write test for scroll functionality
});
