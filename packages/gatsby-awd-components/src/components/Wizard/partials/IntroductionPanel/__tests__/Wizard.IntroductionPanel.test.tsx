import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import IntroductionPanel, { IntroductionPanelProps } from '../index';
import toJson from 'enzyme-to-json';
// import questions from 'src/mocks/wizardQuizQuestions';
// import { ReactComponent as CheckMarkIcon } from 'src/svgs/inline/checkmark-bigger.svg';
import localImage from 'src/stories/assets/localImage';

describe('<IntroductionPanel />', () => {
  let wrapper: ReactWrapper;
  const image = {
    localImage,
    alt: '',
  };
  const introProps: IntroductionPanelProps = {
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
      <div className="wizard__content">
        <IntroductionPanel {...introProps} />
      </div>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
