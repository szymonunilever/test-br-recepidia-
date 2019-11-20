import { DataCapturingFormProps } from '../../DataCapturingForm';
import { Question, ImageSizesOptionsProps } from 'gatsby-awd-components/src';

export interface IntroQuizProps {
  introContent: {
    title: string;
    description: string;
  };
  quizContent: {
    questions: Question[];
    dataCapturing?: DataCapturingFormProps;
    ctas: QuizButton[];
  };
  onClose?: () => void;
  imageSizesOptions?: ImageSizesOptionsProps;
}

export interface QuizButton {
  type: string;
  label: string;
}
