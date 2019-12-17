import { storiesOf } from '@storybook/react';
import React from 'react';
import {
  PreferencesQuiz,
  UserPreferences,
  UserPreferencesIcons,
} from '../index';
import {
  buttonsContent,
  entryUpdateProps,
  noResultProps,
  preferencesIntro,
  preferencesIntroDefault,
  preferencesIntroWithLinks,
  questionsMock as anotherQuestions,
  resultLabelProps,
} from '../mocks/userPreferencesQuestions';
import questionsMock from '../mocks/wizardQuizQuestions';
import { QuestionFilterPropNameKeys } from '../components/Wizard/partials/Quiz/models';
import { ReactComponent as IconArrowUp } from 'src/svgs/inline/arrow-up.svg';
import { ReactComponent as IconArrowDown } from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as IconSuccess } from 'src/svgs/inline/checkmark-bigger.svg';
import { ReactComponent as IconError } from 'src/svgs/inline/x-mark.svg';
import { ReactComponent as IconEdit } from 'src/svgs/inline/edit.svg';
import { ReactComponent as IconDelete } from 'src/svgs/inline/delete.svg';
import { ReactComponent as CheckMarkIcon } from 'src/svgs/inline/checkmark-bigger.svg';

export const icons: UserPreferencesIcons = {
  arrowUp: <IconArrowUp />,
  arrowDown: <IconArrowDown />,
  error: <IconError />,
  success: <IconSuccess />,
  edit: <IconEdit />,
  delete: <IconDelete />,
  checkMark: <CheckMarkIcon />,
};

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
export const answers1 = {
  question1: { value: '1', filterPropName: QuestionFilterPropNameKeys.tags },
  question2: {
    value: ['1', '3', '5'],
    filterPropName: QuestionFilterPropNameKeys.tags,
  },
  question3: { value: '2', filterPropName: QuestionFilterPropNameKeys.tags },
  question4: { value: '1457', filterPropName: QuestionFilterPropNameKeys.tags },
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

const userPreferencesContent = {
  preferencesIntro,
  noResultContent: noResultProps,
  updatePropsContent: entryUpdateProps,
  buttonsContent,
  resultLabelContent: resultLabelProps,
  newsletterSubscriptionsContent: content,
};
const userPreferencesContentDefault = {
  preferencesIntroDefault,
  noResultContent: noResultProps,
  updatePropsContent: entryUpdateProps,
  buttonsContent,
  resultLabelContent: resultLabelProps,
  newsletterSubscriptionsContent: content,
};
export const userPreferencesContentWithLinks = {
  preferencesIntroWithLinks,
  noResultContent: noResultProps,
  updatePropsContent: entryUpdateProps,
  buttonsContent,
  resultLabelContent: resultLabelProps,
  newsletterSubscriptionsContent: content,
};

storiesOf('Generic/User preferences', module)
  .add(
    'default',
    () => (
      <UserPreferences
        {...{
          icons,
          deleteQuestion,
          saveQuestion,
          onNewsletterFormSubmit,
          content: userPreferencesContent,
        }}
      >
        // @ts-ignore
        <PreferencesQuiz
          {...{
            icons,
            questions: questionsMock,
            answers: answers1,
            heading: 'Diet and stuff...',
          }}
        />
      </UserPreferences>
    ),
    { inline: false }
  )
  .add(
    'with multiple quizes',
    () => (
      <UserPreferences
        {...{
          icons,
          deleteQuestion,
          saveQuestion,
          onNewsletterFormSubmit,
          content: userPreferencesContentDefault,
        }}
      >
        //@ts-ignore
        <PreferencesQuiz
          {...{
            icons,
            questions: questionsMock,
            answers: answers1,
            heading: 'Diet and stuff...',
          }}
        />
        //@ts-ignore
        <PreferencesQuiz
          {...{
            icons,
            questions: anotherQuestions,
            answers: answers2,
            heading: 'Another quiz results',
          }}
        />
      </UserPreferences>
    ),
    { inline: false }
  )
  .add(
    'empty',
    () => (
      <UserPreferences
        {...{
          icons,
          deleteQuestion,
          saveQuestion,
          onNewsletterFormSubmit,
          content: userPreferencesContent,
        }}
      >
        //@ts-ignore
        <PreferencesQuiz {...{ icons, questions: [] }} />
      </UserPreferences>
    ),
    {
      inline: false,
    }
  )
  .add(
    'empty with links',
    () => (
      <UserPreferences
        {...{
          icons,
          deleteQuestion,
          saveQuestion,
          onNewsletterFormSubmit,
          content: userPreferencesContentWithLinks,
        }}
      >
        // @ts-ignore
        <PreferencesQuiz {...{ icons, questions: [] }} />
      </UserPreferences>
    ),
    {
      inline: false,
    }
  );
// .add(
//   'User preferences empty',
//   () => (
//     <UserPreferences
//       deleteQuestion={deleteQuestion}
//       saveQuestion={saveQuestion}
//       onNewsletterFormSubmit={onNewsletterFormSubmit}
//       content={userPreferencesContent}
//     >
//       // @ts-ignore
//       <PreferencesQuiz questions={[]} />
//     </UserPreferences>
//   ),
//   {
//     inline: false,
//   }
// )
// .add(
//   'User preferences empty with links',
//   () => (
//     <UserPreferences
//       deleteQuestion={deleteQuestion}
//       saveQuestion={saveQuestion}
//       onNewsletterFormSubmit={onNewsletterFormSubmit}
//       content={userPreferencesContentWithLinks}
//     >
//       // @ts-ignore
//       <PreferencesQuiz questions={[]} />
//     </UserPreferences>
//   ),
//   {
//     inline: false,
//   }
// );
