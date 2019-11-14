import React, { FunctionComponent } from 'react';
import { PreferenceUpdateProps, PreferenceUpdateResultType } from './models';
//TODO: get icons from props or children.
/** Attention: now "src" is webpack alias for the folder "src/components/lib/stories" for storybook app.
 * It was done for compatibility with site app.
 * So for storybook "src" - it's  "src/components/lib/stories" and for gatsby site src it's "src" folder*/
import { ReactComponent as SuccessIcon } from 'src/svgs/inline/checkmark-bigger.svg';
import { ReactComponent as ErrorIcon } from 'src/svgs/inline/x-mark.svg';
import { TagName, Text } from '../../../../Text';

const classNameMap = {
  [PreferenceUpdateResultType.Success]: 'success',
  [PreferenceUpdateResultType.Error]: 'error',
  [PreferenceUpdateResultType.Warning]: 'warning',
};

const iconsMap = {
  [PreferenceUpdateResultType.Success]: SuccessIcon,
  [PreferenceUpdateResultType.Error]: ErrorIcon,
  [PreferenceUpdateResultType.Warning]: 'i',
};

const PreferenceUpdateInfo: FunctionComponent<PreferenceUpdateProps> = ({
  show,
  resultType,
  heading,
  message,
}) => {
  const Icon = iconsMap[resultType];
  return show ? (
    <div
      className={`preferences__content-item-update-${classNameMap[resultType]}`}
    >
      {heading && <Text tag={TagName.h3} text={heading} />}
      {<Icon />}
      <Text tag={TagName.p} text={message} />
    </div>
  ) : null;
};

export default PreferenceUpdateInfo;
