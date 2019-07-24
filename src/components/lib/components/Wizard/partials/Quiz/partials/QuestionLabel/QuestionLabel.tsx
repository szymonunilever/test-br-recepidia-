import React, { FunctionComponent } from 'react';
import { QuestionLabelProps } from './models';
import { TagName, Text } from '../../../../../Text';
import { ProgressBar } from '../../../../../common/Carousel/partials';

const QuestionLabel: FunctionComponent<QuestionLabelProps> = ({ label }) => (
  <div className="wizard__info">
    <div className="wizard__title">
      <Text className="" tag={TagName.h2} text={label} />
    </div>
    <div className="wizard__progress">
      <ProgressBar percentage={33} />
    </div>
  </div>
);

export default QuestionLabel;
