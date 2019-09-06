import {
  Question,
  QuestionFilterPropNameKeys,
} from 'src/components/lib/components/Wizard/partials/Quiz/models';
import { LastInteraction } from '../models';
import { PreferenceButtonsProps } from '../../../index';
import { RecipeAttributesKeys } from 'src/components/lib/components/RecipeAttributes';

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
  selectedOptions: {
    value: string | string[];
    filterPropName: RecipeAttributesKeys | QuestionFilterPropNameKeys;
  };
  editingKey: string;
  setEditEntryKey: (preferenceEntryKey: string) => void;
  deleteEntry: (preferenceEntryKey: string) => void;
  saveEntry: (
    key: string,
    selectedOptions: {
      value: string | string[];
      filterPropName: RecipeAttributesKeys | QuestionFilterPropNameKeys;
    }
  ) => void;
  buttonsContent: PreferenceButtonsProps;
  setLastInteraction: (lastInteraction: LastInteraction | {}) => void;
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
