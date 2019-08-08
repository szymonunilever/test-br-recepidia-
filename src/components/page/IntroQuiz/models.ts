import { Question } from '../../lib/components/Wizard/partials/Quiz/models';

export interface IntroQuizProps {
  introContent: {
    title: string;
    description: string;
  };
  quizContent: {
    questions: Question[];
    primaryButtonLabel: string;
    primaryButtonFinalLabel: string;
    secondaryButtonLabel: string;
  };
}
