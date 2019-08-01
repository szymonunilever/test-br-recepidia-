import React, { FunctionComponent } from 'react';
import { QuestionLabelProps } from './models';
import { TagName, Text } from '../../../../../Text';
import { ProgressBar } from '../../../../../Carousel/partials';

const QuestionLabel: FunctionComponent<QuestionLabelProps> = ({
  label,
  progress,
}) => (
  <div className="wizard__info">
    <div className="wizard__title">
      <Text className="" tag={TagName.p} text={label} />
    </div>
    {progress && (
      <div className="wizard__progress">
        <ProgressBar percentage={progress} />
      </div>
    )}
  </div>
);

export default QuestionLabel;
