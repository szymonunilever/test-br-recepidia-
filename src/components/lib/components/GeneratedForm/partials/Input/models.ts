import { FieldMetaState } from 'react-final-form';

export interface InputProps {
  content: InputContent;
  type: string;
  name: string;
  validate: (val: any) => null | undefined;
  error: (meta: FieldMetaState) => void;
}

interface InputContent {
  label?: string;
  placeholder?: string;
  hint?: string;
  value?: any;
}
