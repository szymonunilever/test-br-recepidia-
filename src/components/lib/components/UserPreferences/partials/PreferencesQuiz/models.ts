import {
  Question,
  QuestionFilterPropNameKeys,
} from '../../../Wizard/partials/Quiz/models';
import { PreferenceUpdateResultType } from './partials/index';
import { PreferenceButtonsProps } from '../../index';
import { ProfileKey } from 'src/utils/browserStorage/models';
import { RecipeAttributesKeys } from '../../../RecipeAttributes/models';

export interface PreferenceQuizProps {
  heading: string;
  questions: Question[];
  answers: Answers;
  editingKey: string;
  setEditingKey: (preferenceEntryKey: string) => void;
  deleteQuestion: (quizKey: ProfileKey, key: string) => void;
  saveQuestion: (
    quizKey: ProfileKey,
    key: string,
    selectedOptions: {
      value: string | object | null;
      filterPropName: RecipeAttributesKeys | QuestionFilterPropNameKeys;
    }
  ) => void;
  lastInteraction: LastInteraction;
  setLastInteraction: (lastInteraction: LastInteraction | {}) => void;
  noResultContent: NoPreferencesProps;
  updatePropsContent: PreferenceEntryUpdateProps;
  buttonsContent: PreferenceButtonsProps;
  quizKey: ProfileKey;
}

export interface Answers {
  [key: string]: {
    value: string | string[];
    filterPropName: RecipeAttributesKeys | QuestionFilterPropNameKeys;
  };
}

export interface PreferenceEntryUpdateProps {
  deleteProps: UpdateProps;
  saveProps: UpdateProps;
}

export interface UpdateProps {
  success: string;
  error: string;
}

export interface NoPreferencesProps {
  heading?: string;
  message: string;
}

export interface LastInteraction {
  key: string;
  resultType: PreferenceUpdateResultType;
  message: string;
  interactionType: PreferenceInteractionType;
}

export enum PreferenceInteractionType {
  Save,
  Delete,
}
