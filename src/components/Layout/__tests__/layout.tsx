/* global describe, it, expect */
import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../Layout';
import { Link } from 'gatsby';

describe('Layout', () => {
  it('renders title from props', () => {
    const wrapper = shallow(<Layout title="Gatsby app" />);
    expect(wrapper.find(Link)).toBeTruthy();
  });
});
