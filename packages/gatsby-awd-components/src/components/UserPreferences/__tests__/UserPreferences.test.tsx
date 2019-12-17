import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import toJson from 'enzyme-to-json';

import {
  PreferencesQuiz,
  UserPreferences,
  UserPreferencesIcons,
} from '../../../index';
import {
  buttonsContent,
  entryUpdateProps,
  noResultProps,
  preferencesIntro,
  questionsMock as anotherQuestions,
  resultLabelProps,
  signUpContent,
  answers1,
  answers2,
  ProfileKey,
} from 'src/mocks/userPreferencesQuestions';
import questionsMock from 'src/mocks/wizardQuizQuestions';
import { ReactComponent as IconArrowUp } from 'src/svgs/inline/arrow-up.svg';
import { ReactComponent as IconArrowDown } from 'src/svgs/inline/arrow-down.svg';
import { ReactComponent as IconSuccess } from 'src/svgs/inline/checkmark-bigger.svg';
import { ReactComponent as IconError } from 'src/svgs/inline/x-mark.svg';
import { ReactComponent as IconEdit } from 'src/svgs/inline/edit.svg';
import { ReactComponent as IconDelete } from 'src/svgs/inline/delete.svg';
import { ReactComponent as CheckMarkIcon } from 'src/svgs/inline/checkmark-bigger.svg';

describe('<UserPreferences />', () => {
  let wrapper: ReactWrapper;
  const icons: UserPreferencesIcons = {
    arrowUp: IconArrowUp,
    arrowDown: IconArrowDown,
    error: IconError,
    success: IconSuccess,
    edit: IconEdit,
    delete: IconDelete,
    checkMark: CheckMarkIcon,
  };

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
    newsletterSubscriptionsContent: signUpContent,
  };

  beforeEach(() => {
    wrapper = mount(
      <UserPreferences
        deleteQuestion={deleteQuestion}
        saveQuestion={saveQuestion}
        onNewsletterFormSubmit={onNewsletterFormSubmit}
        content={userPreferencesContent}
        icons={icons}
      >
        // @ts-ignore
        <PreferencesQuiz
          questions={questionsMock}
          // @ts-ignore
          answers={answers1}
          heading={'heading 1'}
          quizKey={ProfileKey.initialQuiz}
        />
        // @ts-ignore
        <PreferencesQuiz
          questions={anotherQuestions}
          // @ts-ignore
          answers={answers2}
          heading={'heading 2'}
          quizKey={ProfileKey.mealPlannerAnswers}
        />
      </UserPreferences>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('matches the snapshot after question answer change', () => {
    wrapper
      .find('.preferences__content-controls-edit')
      .first()
      .simulate('click');
    wrapper.update();
    wrapper
      .find('.quiz__item-input')
      .first()
      .simulate('click');
    wrapper
      .find('.preferences__content-controls-save')
      .first()
      .simulate('click');
    wrapper
      .find('.preferences__content-controls-delete')
      .at(1)
      .simulate('click');
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
