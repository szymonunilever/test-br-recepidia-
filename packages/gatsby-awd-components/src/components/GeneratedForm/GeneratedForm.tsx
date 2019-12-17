import React, { useState } from 'react';
import { GeneratedFormProps } from './models';

import FormInstance from './partials/FormInstance';

const GeneratedForm = (props: GeneratedFormProps) => {
  const [hasCaptcha] = useState(
    !!props.recaptchaKey &&
      !!props.content.fields.find(
        (field: AppContent.GeneratedForm.Field) => field.type === 'captcha'
      )
  );
  return <FormInstance {...props} hasCaptcha={hasCaptcha} />;
};

export default GeneratedForm;
