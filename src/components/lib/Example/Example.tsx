import React from 'react';
import { ExampleProps } from './models';

const Example = ({ className, text }: ExampleProps) => {
  return <p className={className}>{text}</p>;
};

Example.defaultProps = {
  className: '',
};

export default Example;
