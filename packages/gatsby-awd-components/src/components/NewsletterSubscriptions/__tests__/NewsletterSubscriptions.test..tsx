import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { NewsletterSubscriptions } from '../index';
import toJson from 'enzyme-to-json';
import content from '../../../mocks/GeneratedForm.json';

describe('<NewsletterSubscriptions />', () => {
  let wrapper: ReactWrapper;
  const props: any = {
    onSubmit: () => {},
    content,
  };

  beforeEach(() => {
    wrapper = mount(<NewsletterSubscriptions {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
