import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import GeneratedFormInstance from '../index';
import toJson from 'enzyme-to-json';
import content from 'src/mocks/GeneratedForm.json';

describe('<GeneratedFormInstance />', () => {
  let wrapper: ReactWrapper;
  const props: any = {
    hasCaptcha: true,
    recaptchaKey: 'key',
    recaptchaAction: 'formSubmit',
    content,
    onSubmit: jest.fn(),
    shouldValidate: true,
    titleLevel: 2,
  };

  beforeEach(() => {
    wrapper = mount(<GeneratedFormInstance {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
