import cx from 'classnames';
import React, { useState } from 'react';
import Button from '../common/Button';
import { Modal } from '../common/Modal';
import { SocialSharingProps, SocialSharingViewType } from './models';
import { SocialSharingBase } from './partials';

export const SocialSharing = ({
  className,
  buttonClassName,
  icons,
  viewType = SocialSharingViewType.Base,
  showTextLabels = false,
  content: { buttons, openModalButton },
  handleSocialButtonClick,
  handleSocialDialogClose,
  CloseButtonIcon,
}: SocialSharingProps) => {
  const classWrapper = cx(className, {
    'social-sharing-in-modal': viewType === SocialSharingViewType.Modal,
  });
  const [state, setState] = useState(false);
  let view: JSX.Element | null;

  switch (viewType) {
    case SocialSharingViewType.Base:
      view = (
        <div className={classWrapper}>
          <SocialSharingBase
            buttons={buttons}
            icons={icons}
            buttonClassName={buttonClassName}
            handleSocialButtonClick={handleSocialButtonClick}
            handleSocialDialogClose={handleSocialDialogClose}
            showTextLabels={showTextLabels}
          />
        </div>
      );
      break;
    case SocialSharingViewType.Modal:
      view = (
        <div className={classWrapper}>
          <Button
            className="social-sharing__dialog-open-button"
            content={openModalButton}
            onClick={() => {
              setState(true);
            }}
          />

          <Modal
            isOpen={state}
            className="social-sharing__dialog"
            closeBtn={<CloseButtonIcon />}
            close={() => {
              setState(false);
            }}
          >
            <SocialSharingBase
              buttons={buttons}
              icons={icons}
              buttonClassName={buttonClassName}
              handleSocialButtonClick={handleSocialButtonClick}
              handleSocialDialogClose={handleSocialDialogClose}
              showTextLabels={showTextLabels}
            />
          </Modal>
        </div>
      );
      break;
    default:
      view = (
        <div className={classWrapper}>
          <SocialSharingBase
            buttons={buttons}
            icons={icons}
            buttonClassName={buttonClassName}
            handleSocialButtonClick={handleSocialButtonClick}
            handleSocialDialogClose={handleSocialDialogClose}
            showTextLabels={showTextLabels}
          />
        </div>
      );
      break;
  }

  return view;
};

export default SocialSharing;
