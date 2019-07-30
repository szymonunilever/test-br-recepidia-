import { Question } from '../../models';

export interface QuestionProps {
  question: Question;
  progress?: number;
  onChangeCallback: (key: string, value: string | object | null) => void;
}
