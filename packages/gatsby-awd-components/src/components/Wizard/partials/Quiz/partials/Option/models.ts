import { Icon } from '../../../../../../models';
import { Question, QuestionOption } from '../../models';

export interface OptionProps {
  question: Question;
  option: QuestionOption;
  imageSizes?: string;
  CheckMarkIcon: Icon;
}
