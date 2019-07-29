import React, { Fragment, FunctionComponent } from 'react';
import { PreferenceUpdateResultType, UpdateBlockProps } from './index';
import PreferenceUpdateInfo from './PreferenceUpdateInfo';
import { PreferenceInteractionType } from '../index';

const PreferenceUpdateBlock: FunctionComponent<UpdateBlockProps> = ({
  lastInteraction,
  questionKey,
}) => (
  <Fragment>
    <PreferenceUpdateInfo
      show={
        lastInteraction.key === questionKey &&
        !(
          lastInteraction.interactionType ===
            PreferenceInteractionType.Delete &&
          lastInteraction.resultType === PreferenceUpdateResultType.Success
        )
      }
      resultType={lastInteraction.resultType}
      message={lastInteraction.message}
    />
  </Fragment>
);

PreferenceUpdateBlock.defaultProps = {
  lastInteraction: {
    key: '',
    resultType: 0,
    message: '',
    interactionType: 0,
  },
};

export default PreferenceUpdateBlock;
