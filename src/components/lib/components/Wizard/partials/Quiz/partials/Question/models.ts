import { Question } from '../../models';

export interface QuestionProps {
  question: Question;
  onChangeCallback: (key: string, value: string | object | null) => void;
}
