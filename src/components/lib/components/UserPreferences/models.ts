import { ReactNode } from 'react';
import { PreferencesIntroProps } from './partials/index';
import {
  NoPreferencesProps,
  PreferenceEntryUpdateProps,
} from './partials/PreferencesQuiz/index';
import { ButtonContent } from '../Button/index';
import { ResultCountLabelProps } from './partials/PreferencesQuiz/partials/index';
import { ProfileKey } from 'src/utils/browserStorage/models';

export interface UserPreferencesProps {
  children: ReactNode | ReactNode[];
  deleteQuestion: (quizKey: ProfileKey, key: string) => void;
  saveQuestion: (
    quizKey: ProfileKey,
    key: string,
    value: string | object | null
  ) => void;
  onNewsletterFormSubmit: (values: object) => void;
  content: UserPreferencesContent;
}

export interface UserPreferencesContent {
  preferencesIntroContent?: PreferencesIntroProps;
  noResultContent: NoPreferencesProps;
  updatePropsContent: PreferenceEntryUpdateProps;
  buttonsContent: PreferenceButtonsProps;
  resultLabelContent: ResultCountLabelProps;
  newsletterSubscriptionsContent: AppContent.GeneratedForm.Content;
}

export interface PreferenceButtonsProps {
  editButton: ButtonContent;
  deleteButton: ButtonContent;
  cancelButton: ButtonContent;
  saveButton: ButtonContent;
}
