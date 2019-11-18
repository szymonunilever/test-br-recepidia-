import { WizardStepComponent } from '../../../../models/globalModels';
import { RecipeAttributesKeys } from '../../../RecipeAttributes/models';
import { QuizButton } from 'src/components/page/IntroQuiz/models';

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

export interface QuizProps extends WizardStepComponent {
  intro?: JSX.Element;
  questions: Question[];
  ctas: QuizButton[];
  bottomContent?: JSX.Element;
  imageSizesOptions?: ImageSizesOptionsProps;
  onClose(): any;
}

export interface ImageSizesOptionsProps {
  QUIZ_4_IN_LINE: string;
  QUIZ_3_IN_LINE: string;
  QUIZ_2_IN_LINE: string;
}
