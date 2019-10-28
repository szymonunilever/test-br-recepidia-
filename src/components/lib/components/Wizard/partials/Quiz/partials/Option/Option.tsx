import React, { FunctionComponent } from 'react';
import { OptionProps } from './models';
//TODO: get icons from props or children.
/** Attention: now "src" is webpack alias for the folder "src/components/lib/stories" for storybook app.
 * It was done for compatibility with site app.
 * So for storybook "src" - it's  "src/components/lib/stories" and for gatsby site src it's "src" folder*/
import { ReactComponent as CheckMark } from 'src/svgs/inline/checkmark-bigger.svg';
import OptionLabel from '../OptionLabel';
import AdaptiveImage from '../../../../../AdaptiveImage/AdaptiveImage';
import cx from 'classnames';

const Option: FunctionComponent<OptionProps> = ({
  question,
  option,
  imageSizes = '(max-width: 768px) 50vh, (max-width: 1366px) 30vh, 300px',
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
          <CheckMark />
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
