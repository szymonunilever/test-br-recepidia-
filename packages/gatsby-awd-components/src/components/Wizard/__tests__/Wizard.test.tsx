import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Wizard, { WizardProps } from '../index';
import toJson from 'enzyme-to-json';
import localImage from 'src/stories/assets/localImage';
import IntroductionPanel from '../partials/IntroductionPanel/index';

describe('<Wizard />', () => {
  let wrapper: ReactWrapper;
  const mockCallback = jest.fn(val => {
    val;
  });
  const wizardProps: WizardProps = {
    actionCallback: mockCallback,
    children: [],
  };

  const image = {
    localImage,
    alt: '',
  };
  const introProps = {
    title: 'Meal Planner',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image,
    primaryButtonLabel: 'Get started',
    secondaryButtonLabel: 'Already have a login?',
    bottomContent: <>test</>,
    stepId: 'intro',
    containerClass: 'wizard--intro',
    actionCallback: jest.fn(),
    resultsStore: {},
  };

  beforeEach(() => {
    wrapper = mount(
      <Wizard {...wizardProps}>
        <div key={1}>test123</div>
      </Wizard>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('wizard gets callback invoked', () => {
    const wrapper = mount(
      <Wizard actionCallback={mockCallback} step={0}>
        {/*
      // @ts-ignore */}
        <IntroductionPanel
          {...introProps}
          containerClass="wizard--intro"
          stepId="intro"
        />
      </Wizard>
    );
    wrapper
      .find('.wizard__button--primary')
      .first()
      .simulate('click');
    expect(mockCallback.mock.calls).toHaveLength(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('wizard gets callback invoked 2', () => {
    const wrapper = mount(
      <Wizard actionCallback={mockCallback}>
        {/*
      // @ts-ignore */}
        <IntroductionPanel
          {...introProps}
          containerClass="wizard--intro"
          stepId="intro"
        />
        <IntroductionPanel
          {...introProps}
          containerClass="wizard--intro"
          stepId="finish"
        />
        notValidReactComponent
      </Wizard>
    );
    wrapper
      .find('.wizard__button--primary')
      .first()
      .simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
