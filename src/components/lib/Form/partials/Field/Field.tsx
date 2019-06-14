import React from 'react';
import { Field as FinalFormField, FieldProps } from 'react-final-form';

const Field = (props: FieldProps<any>) => {
  return <FinalFormField {...props} />;
};

export default Field;
