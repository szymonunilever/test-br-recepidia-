import React, { FunctionComponent } from 'react';
import { PreferenceUpdateProps, PreferenceUpdateResultType } from './models';
import { TagName, Text } from '../../../../Text';
import { iconNormalize } from '../../../../../utils';

const classNameMap = {
  [PreferenceUpdateResultType.Success]: 'success',
  [PreferenceUpdateResultType.Error]: 'error',
  [PreferenceUpdateResultType.Warning]: 'warning',
};

const PreferenceUpdateInfo: FunctionComponent<PreferenceUpdateProps> = ({
  show,
  resultType,
  heading,
  message,
  icons,
}) => {
  const iconsMap = {
    [PreferenceUpdateResultType.Success]: iconNormalize(icons.success),
    [PreferenceUpdateResultType.Error]: iconNormalize(icons.error),
    [PreferenceUpdateResultType.Warning]: 'i',
  };
  const icon = iconsMap[resultType];
  return show ? (
    <div
      className={`preferences__content-item-update-${classNameMap[resultType]}`}
    >
      {heading && <Text tag={TagName.h3} text={heading} />}
      {icon}
      <Text tag={TagName.p} text={message} />
    </div>
  ) : null;
};

export default PreferenceUpdateInfo;
