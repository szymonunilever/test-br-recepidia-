import {
  Question,
  QuestionFilterPropNameKeys,
} from '../../../../Wizard/partials/Quiz/models';
import { LastInteraction } from '../models';
import { PreferenceButtonsProps } from '../../../index';
import { RecipeAttributesKeys } from '../../../../RecipeAttributes';
import { Icon } from '../../../../../models';

export interface ResultCountProps {
  count: number;
  labelProps: ResultCountLabelProps;
  icons: ResultCountIcons;
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
  icons: PreferenceEntryIcons;
}

export interface PreferenceUpdateProps {
  show: boolean;
  resultType: PreferenceUpdateResultType;
  heading?: string;
  message: string;
  icons: PreferenceUpdateIcons;
}

export enum PreferenceUpdateResultType {
  Success,
  Warning,
  Error,
}

export interface UpdateBlockProps {
  lastInteraction: LastInteraction;
  questionKey: string;
  icons: PreferenceUpdateIcons;
}
// icons
export interface PreferenceEntryIcons {
  edit: Icon;
  delete: Icon;
  checkMark: Icon;
}

export interface PreferenceUpdateIcons {
  success: Icon;
  error: Icon;
}

export interface ResultCountIcons {
  arrowUp: Icon;
  arrowDown: Icon;
}
