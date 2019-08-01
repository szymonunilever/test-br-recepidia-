import { storiesOf } from '@storybook/react';
import React from 'react';
import { UserPreferences } from '../src/components/lib/components/UserPreferences';
import { PreferencesQuiz } from '../src/components/lib/components/UserPreferences/partials/PreferencesQuiz';
import {
  questionsMock as anotherQuestions,
  preferencesIntroDefault,
  preferencesIntro,
  preferencesIntroWithLinks,
  noResultProps,
  buttonsContent,
  resultLabelProps,
  entryUpdateProps,
} from './mocks/userPreferencesQuestions';
import questionsMock from './mocks/introQuiz';
const content: AppContent.GeneratedForm.Content = {
  view: 'NewsletterSubscriptions',
  submitButton: {
    label: 'Update my preferences',
  },
  title: 'Newsletter subscriptions',
  fields: [
    {
      name: 'Subscribe to newsletter',
      type: 'checkbox',
      label: 'Subscribe to newsletter',
      value: 'Subscribe to newsletter',
    },
    {
      name: 'Subscribe to whitelabel newsletter',
      type: 'checkbox',
      label: 'Subscribe to whitelabel newsletter',
      value: 'Subscribe to whitelabel newsletter',
    },
  ],
};
const answers1 = {
  question1: '1',
  question2: ['1', '3', '5'],
  question3: '2',
  question4: '1457',
};
let answers2 = {};
anotherQuestions.forEach(question => {
  // @ts-ignore
  answers2[question.key] =
    question.type.control === 'radio'
      ? question.options[0].value
      : [question.options[1].value];
});

const deleteQuestion = (key: string) => {
  alert(`Deleted question with key ${key}`);
};
const saveQuestion = (key: string, value: string | object | null) => {
  alert(`Saved question with key '${key}' and new values '${value}'`);
};
const onNewsletterFormSubmit = (values: object) => {
  // eslint-disable-next-line no-console
  console.log('values', values);
};

storiesOf('Components/User preferences', module)
  .add(
    'User preferences default',
    () => (
      <UserPreferences
        deleteQuestion={deleteQuestion}
        saveQuestion={saveQuestion}
        onNewsletterFormSubmit={onNewsletterFormSubmit}
        preferencesIntroProps={preferencesIntroDefault}
        noResultProps={noResultProps}
        buttonsContent={buttonsContent}
        resultLabelProps={resultLabelProps}
        entryUpdateProps={entryUpdateProps}
        newsletterSubscriptionsContent={content}
      >
        // @ts-ignore
        <PreferencesQuiz
          questions={questionsMock}
          answers={answers1}
          heading="Diet and stuff..."
        />
      </UserPreferences>
    ),
    { inline: false }
  )
  .add(
    'User preferences with multiple quizes',
    () => (
      <UserPreferences
        deleteQuestion={deleteQuestion}
        saveQuestion={saveQuestion}
        onNewsletterFormSubmit={onNewsletterFormSubmit}
        preferencesIntroProps={preferencesIntroDefault}
        noResultProps={noResultProps}
        buttonsContent={buttonsContent}
        resultLabelProps={resultLabelProps}
        entryUpdateProps={entryUpdateProps}
        newsletterSubscriptionsContent={content}
      >
        // @ts-ignore
        <PreferencesQuiz
          questions={questionsMock}
          answers={answers1}
          heading="Diet and stuff..."
        />
        // @ts-ignore
        <PreferencesQuiz
          questions={anotherQuestions}
          answers={answers2}
          heading="Another quiz results"
        />
      </UserPreferences>
    ),
    { inline: false }
  )
  .add(
    'User preferences empty',
    () => (
      <UserPreferences
        deleteQuestion={deleteQuestion}
        saveQuestion={saveQuestion}
        preferencesIntroProps={preferencesIntro}
        onNewsletterFormSubmit={onNewsletterFormSubmit}
        noResultProps={noResultProps}
        buttonsContent={buttonsContent}
        resultLabelProps={resultLabelProps}
        entryUpdateProps={entryUpdateProps}
        newsletterSubscriptionsContent={content}
      >
        // @ts-ignore
        <PreferencesQuiz questions={[]} />
      </UserPreferences>
    ),
    {
      inline: false,
    }
  )
  .add(
    'User preferences empty with links',
    () => (
      <UserPreferences
        deleteQuestion={deleteQuestion}
        saveQuestion={saveQuestion}
        preferencesIntroProps={preferencesIntroWithLinks}
        onNewsletterFormSubmit={onNewsletterFormSubmit}
        noResultProps={noResultProps}
        buttonsContent={buttonsContent}
        resultLabelProps={resultLabelProps}
        entryUpdateProps={entryUpdateProps}
        newsletterSubscriptionsContent={content}
      >
        // @ts-ignore
        <PreferencesQuiz questions={[]} />
      </UserPreferences>
    ),
    {
      inline: false,
    }
  );
