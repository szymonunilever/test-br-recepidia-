import { AdaptiveImageProps } from '../../../AdaptiveImage/models';

export interface Question {
  orderIndex: number;
  id: number;
  key: string;
  label: string;
  type: {
    control: string;
    labelPosition: string;
  };
  options: QuestionOption[];
  selectedOptions?: string[];
}

export interface QuestionOption {
  value: string;
  label: {
    text: string;
    image: AdaptiveImageProps;
  };
}

export interface QuizProps {
  intro?: JSX.Element;
  stepId: string;
  containerClass: string;
  questions: Question[];
  primaryButtonLabel: string;
  primaryButtonFinalLabel?: string;
  secondaryButtonLabel: string;
  actionCallback: (answers: object) => void;
  stepResultsCallback?: (answers: object) => void;
}
