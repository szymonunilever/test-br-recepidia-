/* eslint-disable no-console */
import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';
import Button from '../src/components/lib/components/Button';
import Wizard from '../src/components/lib/components/Wizard';
import { default as WizardIntroductionPanel } from '../src/components/lib/components/Wizard/partials/IntroductionPanel';
import { default as WizardFinishPanel } from '../src/components/lib/components/Wizard/partials/FinishPanel';
import { default as WizardQuiz } from '../src/components/lib/components/Wizard/partials/Quiz';
import { default as WizardSignUp } from '../src/components/lib/components/Wizard/partials/SignUp';
import { default as WizardResultSection } from '../src/components/lib/components/Wizard/partials/ResultSection';
import IntroQuiz from '../src/components/page/IntroQuiz';
import questions from './mocks/wizardQuizQuestions';
import recipes from './mocks/recipes';
import localImage from './assets/localImage';
import RecipeListingCarousel from '../src/components/lib/components/RecipeListing/RecipeListingCarousel';

const wizardAction = () => alert('wizard has finished his work');
const image = {
  localImage,
  alt: '',
};
const introContent = {
  title: 'Hello ! Welcome to Recepedia',
  description: 'We want to know you better and feed you with recipes you love!',
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
  questions,
  ctas: [
    { type: 'skip', label: 'Skip' },
    { type: 'next', label: 'Continue' },
    { type: 'final', label: 'Continue' },
  ],
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
      <Wizard actionCallback={wizardAction}>
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
      <Wizard actionCallback={wizardAction}>
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
    'Quiz with intro',
    () => (
      <Wizard actionCallback={wizardAction}>
        {/*
          // @ts-ignore */}
        <WizardQuiz
          intro={
            <Fragment>
              <div className="wizard__info">
                <h1>Welcome to Recepeida</h1>
                <p className="wizard__description">
                  We want to know you better and feed yu with recipes you love
                </p>
              </div>
            </Fragment>
          }
          {...quizProps}
          stepResultsCallback={answers => console.log(answers)}
          containerClass="wizard--quiz wizard--quiz-initial"
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
      <Wizard actionCallback={wizardAction}>
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
      <Wizard actionCallback={wizardAction}>
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
      <Wizard actionCallback={wizardAction}>
        {/*
          // @ts-ignore */}
        <WizardResultSection
          containerClass="wizard--result"
          stepId="result"
          subheading={'Your 7 recipes for the week'}
          title={'My meal plan'}
        >
          <RecipeListingCarousel
            list={recipes}
            config={{
              breakpoints: [
                {
                  width: 1366,
                  switchElementsBelowBreakpoint: 1,
                  switchElementsAfterBreakpoint: 2,
                  visibleElementsBelowBreakpoint: 2,
                  visibleElementsAboveBreakpoint: 4,
                },
              ],
            }}
            titleLevel={1}
            onFavoriteChange={() => alert('favorite change')}
            imageSizes={'(min-width: 768px) 25vw, 50vw'}
          />
        </WizardResultSection>
      </Wizard>
    ),
    {
      info: { inline: true },
    }
  )
  .add(
    'Wizard multiple steps',
    () => (
      <Wizard actionCallback={wizardAction}>
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
          subheading={'Your 7 recipes for the week'}
          title={'My meal plan'}
        >
          <RecipeListingCarousel
            list={recipes}
            config={{
              breakpoints: [
                {
                  width: 1366,
                  switchElementsBelowBreakpoint: 1,
                  switchElementsAfterBreakpoint: 2,
                  visibleElementsBelowBreakpoint: 2,
                  visibleElementsAboveBreakpoint: 4,
                },
              ],
            }}
            titleLevel={1}
            onFavoriteChange={() => alert('favorite change')}
            imageSizes={'(min-width: 768px) 25vw, 50vw'}
          />
        </WizardResultSection>
      </Wizard>
    ),
    {
      info: { inline: true },
    }
  )
  .add(
    'Home page quiz',
    () => (
      <div>
        <p>
          If quiz does not appear in 3 seconds, please reset saved values using
          button below
        </p>
        <Button
          onClick={() => {
            window.localStorage.removeItem('userProfile');
            window.location.reload();
          }}
        >
          Clear saved values and reload page
        </Button>
        <IntroQuiz introContent={introContent} quizContent={quizProps} />
      </div>
    ),
    {
      info: { inline: true },
    }
  );
