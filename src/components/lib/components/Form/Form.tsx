import React from 'react';
import { Form as FinalForm, FormProps } from 'react-final-form';

const Form = (props: FormProps<object>) => {
  return <FinalForm {...props} />;
};

export default Form;
