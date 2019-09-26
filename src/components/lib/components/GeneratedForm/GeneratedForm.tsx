import React, { useEffect, useState } from 'react';
import { GeneratedFormProps } from './models';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import FormInstance from './partials/FormInstance';

const GeneratedForm = (props: GeneratedFormProps) => {
  const [hasCaptcha, setHasCaptcha] = useState(false);
  useEffect(() => {
    //@ts-ignore
    if (window.grecaptcha) {
      const reCaptcha = document.querySelector('.grecaptcha-badge');
      if (reCaptcha && reCaptcha.parentNode) {
        reCaptcha.parentNode.removeChild(reCaptcha);
      }
      //@ts-ignore
      delete window.grecaptcha;
    }

    setHasCaptcha(
      !!props.content.fields.find(
        (field: AppContent.GeneratedForm.Field) => field.type === 'captcha'
      )
    );
    return function cleanup() {
      setHasCaptcha(false);
    };
  });
  const view = hasCaptcha ? (
    <GoogleReCaptchaProvider reCaptchaKey={process.env['ReCaptcha_clientKey']}>
      <FormInstance {...props} hasCaptcha={hasCaptcha} />
    </GoogleReCaptchaProvider>
  ) : (
    <FormInstance {...props} hasCaptcha={hasCaptcha} />
  );

  return <>{view}</>;
};

export default GeneratedForm;
