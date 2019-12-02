import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Tags, { TagsProps } from '../index';
import toJson from 'enzyme-to-json';
import tagsData from '../../../mocks/tags.json';
import { config } from '../../../stories/tags.stories';

describe('<Tags />', () => {
  let wrapper: ReactWrapper;
  // @ts-ignore
  const tagsProps: TagsProps = {
    list: tagsData,
  };

  beforeEach(() => {
    wrapper = mount(<Tags {...tagsProps} {...config} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
