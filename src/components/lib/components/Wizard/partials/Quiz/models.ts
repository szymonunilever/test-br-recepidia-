import { RecipeAttributesKeys } from '../../../RecipeAttributes/models';

export enum QuestionFilterPropNameKeys {
  tags = 'tags',
  empty = '',
}

export interface Question {
  orderIndex: number;
  id: number;
  key: string;
  label: string;
  type: {
    control: string;
    labelPosition: string;
  };
  filterPropName: RecipeAttributesKeys | QuestionFilterPropNameKeys;
  options: QuestionOption[];
}

export interface QuestionOption {
  value: string;
  label: {
    text: string;
    image: {
      localImage?: Internal.LocalImage;
      alt: string;
      url?: string;
    };
  };
}

export interface QuizProps {
  intro?: JSX.Element;
  stepId: string;
  containerClass: string;
  questions: Question[];
  primaryButtonLabel: string;
  primaryButtonFinalLabel?: string;
  secondaryButtonLabel?: string;
  bottomContent?: JSX.Element;
  actionCallback: (answers: object) => void;
  stepResultsCallback?: (answers: object) => void;
}
