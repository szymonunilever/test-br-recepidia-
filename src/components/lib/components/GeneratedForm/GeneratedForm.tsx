import React, { useState } from 'react';
import { GeneratedFormProps } from './models';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import FormInstance from './partials/FormInstance';

const GeneratedForm = (props: GeneratedFormProps) => {
  const [hasCaptcha] = useState(
    !!props.content.fields.find(
      (field: AppContent.GeneratedForm.Field) => field.type === 'captcha'
    )
  );
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
