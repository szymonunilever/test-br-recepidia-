import { Icon } from '../../../../../../models';
import { Question } from '../../models';

export interface QuestionProps {
  question: Question;
  progress?: number;
  selectedOptions?: string | string[];
  onChangeCallback: (key: string, value: string | object | null) => void;
  imageSizes?: string;
  CheckMarkIcon: Icon;
}
