import React, { useState, useEffect, FunctionComponent } from 'react';
import { PreferenceUpdateResultType, UpdateBlockProps } from './index';
import PreferenceUpdateInfo from './PreferenceUpdateInfo';
import { PreferenceInteractionType } from '../index';

// According to the requirements: "successful update message near the updated Q&A is displayed for 3 sec"
const successSaveMessageShowTime = 3000;

const PreferenceUpdateBlock: FunctionComponent<UpdateBlockProps> = ({
  lastInteraction,
  questionKey,
}) => {
  const [shouldShow, setShouldShow] = useState<boolean>(
    lastInteraction.key === questionKey &&
      !(
        lastInteraction.interactionType === PreferenceInteractionType.Delete &&
        lastInteraction.resultType === PreferenceUpdateResultType.Success
      ) &&
      !(
        lastInteraction.interactionType === PreferenceInteractionType.Edit &&
        lastInteraction.resultType === PreferenceUpdateResultType.Success
      )
  );
  useEffect(() => {
    if (shouldShow) {
      setTimeout(() => setShouldShow(false), successSaveMessageShowTime);
    }
  }, [shouldShow]);

  return (
    <PreferenceUpdateInfo
      show={shouldShow}
      resultType={lastInteraction.resultType}
      message={lastInteraction.message}
    />
  );
};

PreferenceUpdateBlock.defaultProps = {
  lastInteraction: {
    key: '',
    resultType: 0,
    message: '',
    interactionType: 0,
  },
};

export default PreferenceUpdateBlock;
