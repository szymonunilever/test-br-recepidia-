import { Question } from '../../../Wizard/partials/Quiz/models';
import { PreferenceUpdateResultType } from './partials/index';
import { PreferenceButtonsProps } from '../../index';

export interface PreferenceQuizProps {
  heading: string;
  questions: Question[];
  editingKey: string;
  setEditingKey: (preferenceEntryKey: string) => void;
  deleteQuestion: (key: string) => void;
  saveQuestion: (key: string, value: string | object | null) => void;
  lastInteraction: LastInteraction;
  setLastInteraction: (lastInteraction: LastInteraction | {}) => void;
  noResultProps: NoPreferencesProps;
  entryUpdateProps: PreferenceEntryUpdateProps;
  buttonsContent: PreferenceButtonsProps;
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
