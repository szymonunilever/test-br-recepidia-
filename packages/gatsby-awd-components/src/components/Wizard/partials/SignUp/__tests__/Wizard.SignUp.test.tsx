import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import SignUp, { SignUpProps } from '../index';
import toJson from 'enzyme-to-json';
import { formContentMock } from 'src/mocks/signUpFormContent.js';

describe('<SignUp />', () => {
  let wrapper: ReactWrapper;
  const signUpProps: SignUpProps = {
    actionCallback: () => console.log(),
    formContent: formContentMock,
    title: 'Lorem ipsum',
    containerClass: 'test',
    stepId: 'test',
  };

  beforeEach(() => {
    wrapper = mount(<SignUp {...signUpProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
