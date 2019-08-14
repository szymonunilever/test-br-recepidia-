import keys from 'integrations/keys.json';

const { formService } = keys;
const FormService = ({ url, host }: FormServiceProps) => {
  if (!url) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (formData: any): Promise<any> => {
    let formDataFormated: any;

    switch (formData.formType) {
      case 'contactUs':
        {
          const {
            brand,
            formType,
            formUrl,
            locale,
            reCaptchaToken,
            ...other
          } = formData;
          const {
            comments,
            inquiryType,
            recipe,
            regardingSpecificRecipe,
            ...contact
          } = other;
          formDataFormated = {
            brand,
            formType,
            formUrl,
            locale,
            contactUs: {
              comments,
              inquiryType: inquiryType.value,
              recipe,
              regardingSpecificRecipe,
            },
            contact: contact,
            g: {
              recaptcha: {
                type: 'captcha',
                response: reCaptchaToken || 'perfskip1234134',
              },
            },
          };
        }
        break;
      case 'signUp':
        formDataFormated = {};
        break;
    }
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Connection: 'keep-alive',
        'Content-Length': '1007',
        Host: host,
      },
      body: JSON.stringify(formDataFormated),
    }).then(response => response.json());
  };
};

export default FormService(formService);

export interface FormServiceProps {
  url?: string;
  host: string;
}
