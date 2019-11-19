import React from 'react';
import { Form as FinalForm } from 'react-final-form';
import { UnileverFormProps } from './models';

const Form = (props: UnileverFormProps) => {
  return <FinalForm {...props} />;
};

export default Form;
