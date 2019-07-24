/* eslint-disable no-console */
import { storiesOf } from '@storybook/react';
import React from 'react';
import Wizard from '../src/components/lib/components/Wizard';
import { default as WizardIntroductionPanel } from '../src/components/lib/components/Wizard/partials/IntroductionPanel';
import { default as WizardFinishPanel } from '../src/components/lib/components/Wizard/partials/FinishPanel';
import { default as WizardQuiz } from '../src/components/lib/components/Wizard/partials/Quiz';
import { default as WizardSignUp } from '../src/components/lib/components/Wizard/partials/SignUp';
import { default as WizardResultSection } from '../src/components/lib/components/Wizard/partials/ResultSection';
import recipes from './mocks/recipes';
import localImage from './assets/localImage';

const closeCallback = () => alert('test');
const wizardAction = () => alert('wizard has finished his work');
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
};
const quizProps = {
  questions: [
    {
      orderIndex: 1,
      id: 1,
      key: 'question1',
      label: 'What do you like?',
      type: {
        control: 'checkbox',
      },
      options: [
        {
          value: 'meat',
          label: {
            text: 'Some text about meat',
            image,
          },
        },
        {
          value: 'bread',
          label: {
            text: 'Some text about bread',
            image,
          },
        },
      ],
    },
    {
      orderIndex: 2,
      id: 2,
      key: 'question2',
      label: 'Choose your favourite dish?',
      type: {
        control: 'radio',
      },
      options: [
        {
          value: 'meat',
          label: {
            text: 'Some text about meat',
            image,
          },
        },
        {
          value: 'bread',
          label: {
            text: 'Some text about bread',
            image,
          },
        },
      ],
    },
  ],
  primaryButtonLabel: 'Continue',
  secondaryButtonLabel: 'Skip',
};
const finishProps = {
  title: 'Congrats!',
  subheading: 'Your profile has been created.',
  description:
    'Please activate your e-mail to enjoy building your personalized meal plan',
  image,
  primaryButtonLabel: 'Go ahead',
};

const signUpProps = {
  formContent: {
    view: 'TestGeneratedForm',
    fields: [
      {
        name: 'firstname',
        type: 'text',
        placeholder: 'Ex. John',
        label: 'First Name',
        validationRules: [
          {
            type: 'required',
            errorMessage: 'This field is required.',
          },
        ],
      },
      {
        name: 'lastname',
        type: 'text',
        placeholder: 'Ex. Doe',
        label: 'Last Name',
        validationRules: [
          {
            type: 'required',
            errorMessage: 'This field is required.',
          },
        ],
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Ex. johndoe@gmail.com',
        label: 'Email',
        validationRules: [
          {
            type: 'required',
            errorMessage: 'This field is required.',
          },
          {
            type: 'email',
            errorMessage: 'Should be a valid email.',
          },
        ],
      },
      {
        name: 'subscribtion',
        type: 'fieldset',
        label: 'Would you like to hear from us?',
      },
      {
        name: 'subscribe',
        type: 'checkbox',
        fieldset: 'subscribtion',
        label:
          'Brand opt-in lorem ipsum dolor sit amet, consectetur felis adipiscing elit.',
        value: 'subscribe',
      },
    ],
    submitButton: {
      label: 'Sign up',
    },
  },
  title:
    'Ready to dig in the new recipes and start cooking? Save your preferences and create your profile!',
};

storiesOf('Diagnostic tools (components)', module)
  .add(
    'Introduction Panel',
    () => (
      <Wizard actionCallback={wizardAction} closeCallback={closeCallback}>
        {/*
          // @ts-ignore */}
        <WizardIntroductionPanel
          {...introProps}
          containerClass="wizard--intro"
          stepId="intro"
        />
      </Wizard>
    ),
    {
      info: { inline: true },
    }
  )
  .add(
    'Quiz',
    () => (
      <Wizard actionCallback={wizardAction} closeCallback={closeCallback}>
        {/*
          // @ts-ignore */}
        <WizardQuiz
          {...quizProps}
          containerClass="wizard--quiz"
          stepId="quiz"
        />
      </Wizard>
    ),
    {
      info: { inline: true },
    }
  )
  .add(
    'Finish Panel',
    () => (
      <Wizard actionCallback={wizardAction} closeCallback={closeCallback}>
        {/*
          // @ts-ignore */}
        <WizardFinishPanel
          {...finishProps}
          containerClass="wizard--intro"
          stepId="finish"
        />
      </Wizard>
    ),
    {
      info: { inline: true },
    }
  )
  .add(
    'SignUp Panel',
    () => (
      <Wizard actionCallback={wizardAction} closeCallback={closeCallback}>
        {/*
          // @ts-ignore */}
        <WizardSignUp
          {...signUpProps}
          containerClass="wizard--signup"
          stepId="signup"
        />
      </Wizard>
    ),
    {
      info: { inline: true },
    }
  )
  .add(
    'Result section',
    () => (
      <Wizard actionCallback={wizardAction} closeCallback={closeCallback}>
        {/*
          // @ts-ignore */}
        <WizardResultSection
          containerClass="wizard--result"
          stepId="result"
          items={recipes}
          subheading={'Your 7 recipes for the week'}
          title={'My meal plan'}
        />
      </Wizard>
    ),
    {
      info: { inline: true },
    }
  )
  .add(
    'Wizard multiple steps',
    () => (
      <Wizard actionCallback={wizardAction} closeCallback={closeCallback}>
        {/*
          // @ts-ignore */}
        <WizardIntroductionPanel
          {...introProps}
          containerClass="wizard--intro"
          stepId="intro"
        />
        {/*
          // @ts-ignore */}
        <WizardQuiz
          {...quizProps}
          containerClass="wizard--quiz"
          stepId="quiz"
        />
        {/*
          // @ts-ignore */}
        <WizardFinishPanel
          {...finishProps}
          containerClass="wizard--intro"
          stepId="finish"
        />
        {/*
          // @ts-ignore */}
        <WizardSignUp
          {...signUpProps}
          containerClass="wizard--signup"
          stepId="signup"
        />
        {/*
          // @ts-ignore */}
        <WizardResultSection
          containerClass="wizard--result"
          stepId="result"
          items={recipes}
          subheading={'Your 7 recipes for the week'}
          title={'My meal plan'}
        />
      </Wizard>
    ),
    {
      info: { inline: true },
    }
  );
