import { DataCapturingFormProps } from '../../DataCapturingForm';
import { Question } from '../../lib/components/Wizard/partials/Quiz/models';

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
}

export interface QuizButton {
  type: string;
  label: string;
}
