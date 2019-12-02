import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { GeneratedForm } from '../index';
import toJson from 'enzyme-to-json';
import content from 'src/mocks/GeneratedForm.json';

describe('<GeneratedForm />', () => {
  let wrapper: ReactWrapper;
  const props: any = {
    onSubmit: () => {},
    content: content,
    hasCaptcha: true,
    shouldValidate: true,
    recaptchaAction: 'signUp',
    titleLevel: 1,
  };

  beforeEach(() => {
    wrapper = mount(<GeneratedForm {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should validate form', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(wrapper.find('.field__error')).toHaveLength(9);
  });
});
