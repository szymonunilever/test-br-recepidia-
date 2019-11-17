/* global describe, it, expect, jest, afterEach */
import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'gatsby';

import Layout from '../Layout';

jest.mock('gatsby', () => ({
  ...jest.requireActual('gatsby'),
  graphql: jest.fn(),
  useStaticQuery: jest.fn(() => ({
    allCommonComponent: {
      nodes: [
        {
          content:
            '{"list":[{"name":"Recipes","children":[{"name":"See all Recipes","path":"/recipes"}]},{"name":"Meal Planner","path":"/meal-planner"}]}',
          name: 'GlobalNavigation',
        },
        {
          content:
            '{"title":"Looking for something?","placeholderText":"Type something"}',
          name: 'SearchInput',
        },
        {
          content:
            '{"copyrightText":"Unilever","lists":[{"items":[{"name":"Vegan dishes","path":"/vegan-dishes"},{"name":"Spring Delights","path":"/spring-delights"},{"name":"Barbecue & Grilling","path":"/barbecue-grilling"},{"name":"Meals In Minutes","path":"/meals-in-minutes"}]},{"items":[{"name":"Meal Planner","path":"/meal-planner"},{"name":"About us","path":"/about-us"},{"name":"Contact us","path":"/contact-us"},{"name":"Acessibility","path":"/acessibility"},{"name":"Cookie Policy","path":"https://www.unilevercookiepolicy.com/pt_PT/policy.aspx"},{"name":"Privacy Policy","path":"https://www.unileverprivacypolicy.com/portuguese/policy.aspx"},{"name":"Legal Notice","path":"https://www.unilever.com.br/legal.html"},{"name":"Sitemap","path":"/sitemap"}]}]}',
          name: 'GlobalFooter',
        },
        {
          content:
            '{"socialItems":{"facebook":{"label":"Facebook","url":"https://www.facebook.com/"},"instagram":{"label":"Instagram","url":"https://www.instagram.com/"},"twitter":{"label":"Twitter","url":"https://twitter.com/"},"pinterest":{"label":"Pinterest","url":"https://www.pinterest.com/"}}}',
          name: 'BrandSocialChannels',
        },
        {
          content:
            '{"view":"SignUpForm","title":"Easy & healthy recipes every week","fields":[{"name":"email input","type":"email","placeholder":"Your email address","validationRules":[{"type":"required","errorMessage":"This field is required."},{"type":"maxLength","value":20,"errorMessage":"This field is too long."},{"type":"minLength","value":4,"errorMessage":"This field is too short."},{"type":"email","errorMessage":"Should be a valid email."}]}],"submitButton":{"label":"Sign Up!"}}',
          name: 'Form',
        },
      ],
    },
  })),
}));

afterEach(jest.resetAllMocks);

describe('Layout', () => {
  it('renders title from props', () => {
    const wrapper = shallow(<Layout title="Gatsby app" />);
    expect(wrapper.find(Link)).toBeTruthy();
  });
});
