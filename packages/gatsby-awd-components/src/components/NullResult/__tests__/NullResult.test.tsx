import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NullResult } from '../index';
import toJson from 'enzyme-to-json';
const contentVariants = [
  {
    title: 'Oops! No results',
    subtitle: 'Maybe try the following:',
    textList: [`Don't use too many filters at once`, `Try using only filters`],
  },
  {
    subtitle: 'Maybe try the following:',
    textList: [`Don't use too many filters at once`, `Try using only filters`],
  },
  {
    title: 'Oops! No results',
    textList: [`Don't use too many filters at once`, `Try using only filters`],
  },
];
describe('<NullResult />', () => {
  let wrapper: ReactWrapper;
  it('matches the snapshot', () => {
    contentVariants.forEach(content => {
      wrapper = mount(<NullResult {...{ content }} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
