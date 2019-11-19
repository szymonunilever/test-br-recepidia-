import { Icon, WizardStepComponent } from '../../../../models';
import { RecipeAttributesKeys } from '../../../RecipeAttributes';

export interface QuizButton {
  type: string;
  label: string;
}

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
  CheckMarkIcon: Icon;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose(): any;
}

export interface ImageSizesOptionsProps {
  QUIZ_SMALL: string;
  QUIZ_BIG: string;
}
