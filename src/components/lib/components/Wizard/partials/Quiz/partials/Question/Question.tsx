import React, { FunctionComponent } from 'react';
import Multi from '../Multi';
import Single from '../Single';
import { QuestionProps } from './models';

const componentsMap = {
  radio: Single,
  checkbox: Multi,
};

const Question: FunctionComponent<QuestionProps> = ({
  question,
  onChangeCallback,
}) => {
  // @ts-ignore
  const Component = componentsMap[question.type.control];

  return Component ? <Component {...{ question, onChangeCallback }} /> : null;
};

export default Question;
