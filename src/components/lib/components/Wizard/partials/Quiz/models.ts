import { AdaptiveImageProps } from '../../../AdaptiveImage/models';

export interface Question {
  orderIndex: number;
  id: number;
  key: string;
  label: string;
  type: {
    control: string;
  };
  options: QuestionOption[];
}

export interface QuestionOption {
  value: string;
  label: {
    text: string;
    image: AdaptiveImageProps;
  };
}

export interface QuizProps {
  stepId: string;
  containerClass: string;
  questions: Question[];
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  actionCallback: (answers: object) => void;
}
