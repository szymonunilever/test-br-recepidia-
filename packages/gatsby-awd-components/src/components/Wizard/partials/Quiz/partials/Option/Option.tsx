import React, { FunctionComponent } from 'react';
import { iconNormalize } from '../../../../../../utils';
import { OptionProps } from './models';
import OptionLabel from '../OptionLabel';
import AdaptiveImage from '../../../../../AdaptiveImage/AdaptiveImage';
import cx from 'classnames';

const Option: FunctionComponent<OptionProps> = ({
  question,
  option,
  imageSizes = '(max-width: 768px) 50vh, (max-width: 1366px) 30vh, 300px',
  CheckMarkIcon,
}) => {
  const {
    type: { labelPosition },
  } = question;
  const containerClass = cx(
    'quiz__label-content',
    `quiz__label--${labelPosition}`
  );

  return (
    <div className={containerClass}>
      <div className="quiz__label-image-wrap">
        <div className="quiz__label-checkmark">
          {iconNormalize(CheckMarkIcon)}
          {labelPosition === 'inside' && (
            <OptionLabel label={option.label.text} />
          )}
        </div>

        {option.label.image && option.label.image.localImage && (
          // @ts-ignore
          <AdaptiveImage
            className="quiz__label-image"
            {...option.label.image}
            sizes={imageSizes}
          />
        )}
      </div>
      {labelPosition === 'bottom' && <OptionLabel label={option.label.text} />}
    </div>
  );
};

export default Option;
