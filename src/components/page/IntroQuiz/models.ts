import { Question } from '../../lib/components/Wizard/partials/Quiz/models';

export interface IntroQuizProps {
  questions: Question[];
  primaryButtonLabel: string;
  primaryButtonFinalLabel: string;
  secondaryButtonLabel: string;
}
