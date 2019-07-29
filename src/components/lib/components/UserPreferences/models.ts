import { ReactNode } from 'react';
import { PreferencesIntroProps } from './partials/index';
import {
  NoPreferencesProps,
  PreferenceEntryUpdateProps,
} from './partials/PreferencesQuiz/index';
import { ButtonContent } from '../Button/index';
import { ResultCountLabelProps } from './partials/PreferencesQuiz/partials/index';

export interface UserPreferencesProps {
  children: ReactNode | ReactNode[];
  preferencesIntroProps?: PreferencesIntroProps;
  deleteQuestion: (key: string) => void;
  saveQuestion: (key: string, value: string | object | null) => void;
  onNewsletterFormSubmit: (values: object) => void;
  noResultProps: NoPreferencesProps;
  entryUpdateProps: PreferenceEntryUpdateProps;
  buttonsContent: PreferenceButtonsProps;
  resultLabelProps: ResultCountLabelProps;
  newsletterSubscriptionsContent: AppContent.GeneratedForm.Content;
}

export interface PreferenceButtonsProps {
  editButton: ButtonContent;
  deleteButton: ButtonContent;
  cancelButton: ButtonContent;
  saveButton: ButtonContent;
}
