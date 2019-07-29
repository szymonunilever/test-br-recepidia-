import React, { FunctionComponent } from 'react';
import { PreferenceUpdateProps, PreferenceUpdateResultType } from './models';
import SuccessIcon from 'src/svgs/inline/checkmark-bigger.svg';
import ErrorIcon from 'src/svgs/inline/x-mark.svg';
import { TagName, Text } from 'src/components/lib/components/Text';

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
