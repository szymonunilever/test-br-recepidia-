import { Question } from 'src/components/lib/components/Wizard/partials/Quiz/models';
import { LastInteraction } from '../models';
import { PreferenceButtonsProps } from '../../../index';

export interface ResultCountProps {
  count: number;
  labelProps: ResultCountLabelProps;
}

export interface ResultCountLabelProps {
  showResultLabel: string;
  savedResultsTemplateSingle: string;
  savedResultsTemplatePlural: string;
}

export interface PreferenceEntryProps {
  preferenceEntry: Question;
  editingKey: string;
  setEditEntryKey: (preferenceEntryKey: string) => void;
  deleteEntry: (preferenceEntryKey: string) => void;
  saveEntry: (key: string, value: string | object | null) => void;
  buttonsContent: PreferenceButtonsProps;
}

export interface PreferenceUpdateProps {
  show: boolean;
  resultType: PreferenceUpdateResultType;
  heading?: string;
  message: string;
}

export enum PreferenceUpdateResultType {
  Success,
  Warning,
  Error,
}

export interface UpdateBlockProps {
  lastInteraction: LastInteraction;
  questionKey: string;
}
