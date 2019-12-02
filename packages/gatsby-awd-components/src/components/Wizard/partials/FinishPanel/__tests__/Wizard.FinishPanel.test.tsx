import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import FinishPanel, { FinishPanelProps } from '../index';
import toJson from 'enzyme-to-json';
import localImage from 'src/stories/assets/localImage';

describe('<IntroductionPanel />', () => {
  let wrapper: ReactWrapper;
  const image = {
    localImage,
    alt: '',
  };
  const introProps: FinishPanelProps = {
    title: 'Meal Planner',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    image,
    primaryButtonLabel: 'Get started',
    stepId: 'intro',
    containerClass: 'wizard--intro',
    actionCallback: jest.fn(),
    resultsStore: {},
    subheading: '',
  };

  beforeEach(() => {
    wrapper = mount(
      <div className="wizard__content">
        <FinishPanel {...introProps} />
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
