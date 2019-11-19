/* eslint-disable no-console */
import { storiesOf } from '@storybook/react';
import React, { Fragment } from 'react';
import {
  FinishPanel as WizardFinishPanel,
  IntroductionPanel as WizardIntroductionPanel,
  Quiz as WizardQuiz,
  RecipeListing,
  RecipeListingIcons,
  RecipeListViewType,
  ResultSection as WizardResultSection,
  SignUp as WizardSignUp,
  Wizard,
} from '../index';
import questions from '../mocks/wizardQuizQuestions';

import recipes from '../mocks/recipes.json';
import localImage from './assets/localImage';
import resultContent from '../mocks/WizardResultSection.json';
import { ReactComponent as ArrowIcon } from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as CheckMarkIcon } from 'src/svgs/inline/checkmark-bigger.svg';
import { ReactComponent as FavoriteIcon } from 'src/svgs/inline/favorite.svg';
import { ReactComponent as OpenIcon } from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as RemoveTagIcon } from 'src/svgs/inline/x-mark.svg';
import { ReactComponent as FilterIcon } from 'src/svgs/inline/filter.svg';
import { ReactComponent as CloseSvg } from 'src/svgs/inline/x-mark.svg';
const icons: RecipeListingIcons = {
  close: CloseSvg,
  favorite: FavoriteIcon,
  filter: FilterIcon,
  open: OpenIcon,
  removeTag: RemoveTagIcon,
};

const wizardAction = () => alert('wizard has finished his work');
const image = {
  localImage,
  alt: '',
};
const recipesContents = {
  title: 'Recipe carousel default',
  nullResult: {
    title: 'Oops! No results',
    subtitle: '',
    textList: [],
  },
};
const recipesList: Internal.Recipe[] = recipes.data.allRecipe.edges.map(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (item: { node: Internal.Recipe | any }) => item.node
);
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
    { type: 'back', label: 'Back' },
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

storiesOf('Generic/Wizard', module)
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
      info: { inline: false },
    }
  )
  .add(
    'Quiz',
    () => (
      <Wizard actionCallback={wizardAction}>
        {/*
     //@ts-ignore */}
        <WizardQuiz
          CheckMarkIcon={CheckMarkIcon}
          {...quizProps}
          containerClass="wizard--quiz"
          stepId="quiz"
        />
      </Wizard>
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Quiz with intro',
    () => (
      <Wizard actionCallback={wizardAction}>
        {/*
     //@ts-ignore */}
        <WizardQuiz
          CheckMarkIcon={CheckMarkIcon}
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
      info: { inline: false },
    }
  )
  .add(
    'Finish Panel',
    () => (
      <Wizard actionCallback={wizardAction}>
        {/*
     //@ts-ignore */}
        <WizardFinishPanel
          {...finishProps}
          containerClass="wizard--intro"
          stepId="finish"
        />
      </Wizard>
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'SignUp Panel',
    () => (
      <Wizard actionCallback={wizardAction}>
        {/*
     //@ts-ignore */}
        <WizardSignUp
          {...signUpProps}
          containerClass="wizard--form"
          stepId="signup"
        />
      </Wizard>
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Result section',
    () => (
      <Wizard actionCallback={wizardAction}>
        <WizardResultSection
          containerClass="wizard--result"
          stepId="result"
          resultSize={recipesList.length}
          {...resultContent}
          actionCallback={() => {}}
          callbacks={{
            back: () => {},
          }}
        >
          <RecipeListing
            icons={icons}
            list={recipesList}
            viewType={RecipeListViewType.Carousel}
            className="recipe-list--carousel"
            content={recipesContents}
            titleLevel={3}
            carouselConfig={{
              breakpoints: [
                {
                  width: 1366,
                  switchElementsBelowBreakpoint: 1,
                  switchElementsAfterBreakpoint: 2,
                  visibleElementsBelowBreakpoint: 2,
                  visibleElementsAboveBreakpoint: 4,
                },
              ],
              arrowIcon: <ArrowIcon />,
            }}
            imageSizes={'(min-width: 768px) 25vw, 50vw'}
          />
        </WizardResultSection>
      </Wizard>
    ),
    {
      info: { inline: false },
    }
  )
  .add(
    'Wizard multiple steps',
    () => (
      <Wizard actionCallback={wizardAction}>
        {/*
     //@ts-ignore */}
        <WizardIntroductionPanel
          {...introProps}
          containerClass="wizard--intro"
          stepId="intro"
        />
        {/*
     //@ts-ignore */}
        <WizardQuiz
          CheckMarkIcon={CheckMarkIcon}
          {...quizProps}
          containerClass="wizard--quiz"
          stepId="quiz"
        />
        {/*
     //@ts-ignore */}
        <WizardFinishPanel
          {...finishProps}
          containerClass="wizard--intro"
          stepId="finish"
        />
        {/*
     //@ts-ignore */}
        <WizardSignUp
          {...signUpProps}
          containerClass="wizard--signup"
          stepId="signup"
        />

        <WizardResultSection
          containerClass="wizard--result"
          stepId="result"
          resultSize={recipesList.length}
          {...resultContent}
          actionCallback={() => {}}
          callbacks={{
            back: () => {},
          }}
        >
          <RecipeListing
            icons={icons}
            list={recipesList}
            viewType={RecipeListViewType.Carousel}
            className="recipe-list--carousel"
            content={recipesContents}
            titleLevel={3}
            carouselConfig={{
              breakpoints: [
                {
                  width: 1366,
                  switchElementsBelowBreakpoint: 1,
                  switchElementsAfterBreakpoint: 2,
                  visibleElementsBelowBreakpoint: 2,
                  visibleElementsAboveBreakpoint: 4,
                },
              ],
              arrowIcon: <ArrowIcon />,
            }}
            imageSizes={'(min-width: 768px) 25vw, 50vw'}
          />
        </WizardResultSection>
      </Wizard>
    ),
    {
      info: { inline: false },
    }
  );
