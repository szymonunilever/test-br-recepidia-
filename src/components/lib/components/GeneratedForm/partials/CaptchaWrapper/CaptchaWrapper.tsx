import React from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { CaptchaWrapperProps } from './models';

export const CaptchaWrapper = ({
  action,
  children,
  onValidate,
}: CaptchaWrapperProps) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const validateCaptcha = async () => {
    if (!executeRecaptcha) {
      return;
    }
    onValidate(await executeRecaptcha(action));
  };

  const props = children ? children.props : null;

  return <button {...props} onClick={validateCaptcha} />;
};

export default CaptchaWrapper;
