import { ReactChildren } from 'react';

export interface CaptchaWrapperProps {
  action: string;
  children: JSX.Element;
  onValidate: (val: string) => void;
}
