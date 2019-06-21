import React from 'react';
import { Field as FinalFormField, FieldProps } from 'react-final-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Field = (props: FieldProps<any>) => {
  return <FinalFormField {...props} />;
};

export default Field;
