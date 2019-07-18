import { FluidObject } from 'gatsby-image';

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
    image: {
      fluid: FluidObject;
      alt: string;
    };
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
