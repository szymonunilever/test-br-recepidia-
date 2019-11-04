import { DataCapturingFormProps } from './models';

export function sendForm(
  url: string,
  host: string,
  data: DataCapturingFormData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  if (!url) {
    return new Promise((resolve, reject) => {
      reject();
    });
  }
  const formDataFormatted = ((data: DataCapturingFormData) => {
    //TODO: this should be mapping data to rignt format for API.
    return data;
  })(data);

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Connection: 'keep-alive',
      'Content-Length': '1007',
      Host: host,
    },
    body: JSON.stringify(formDataFormatted),
  });
}

export function checkReCaptchaEnabled(
  formFieldsData: AppContent.GeneratedForm.Content
): AppContent.GeneratedForm.Content {
  if (process.env['ReCaptcha_enabled'] === 'false') {
    formFieldsData.fields = formFieldsData.fields.filter(
      (field: AppContent.GeneratedForm.Field) => field.type !== 'captcha'
    );
  }
  return formFieldsData;
}

export interface DataCapturingFormData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
}
