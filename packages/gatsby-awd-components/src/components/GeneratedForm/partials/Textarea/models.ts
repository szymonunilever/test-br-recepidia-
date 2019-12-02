import { FieldMetaState } from 'react-final-form';

export interface TextareaProps {
  content: TextareaContent;
  rows?: number;
  rules?: AppContent.GeneratedForm.Rule[];
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate: (val: any) => null | undefined;
  error: (meta: FieldMetaState<string>) => void;
}

export interface TextareaContent {
  label?: string;
  placeholder?: string;
  hint?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
}
