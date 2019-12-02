import React, { FunctionComponent } from 'react';
import Multi from '../Multi';
import Single from '../Single';
import { QuestionProps } from './models';

const componentsMap: { [key: string]: FunctionComponent<QuestionProps> } = {
  radio: Single,
  checkbox: Multi,
};

const Question: FunctionComponent<QuestionProps> = ({
  question,
  progress,
  selectedOptions,
  onChangeCallback,
  imageSizes,
  CheckMarkIcon,
}) => {
  const Component: FunctionComponent<QuestionProps> =
    componentsMap[question.type.control];

  return (
    Component && (
      <Component
        {...{
          question,
          progress,
          selectedOptions,
          onChangeCallback,
          imageSizes,
          CheckMarkIcon,
        }}
        key={question.id}
      />
    )
  );
};

export default Question;
