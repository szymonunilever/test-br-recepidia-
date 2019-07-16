import cx from 'classnames';
import React, { useState } from 'react';
import Button from '../common/Button';
import Icon from 'src/svgs/inline/social-sharing.svg';
import { ButtonViewType } from '../common/Button';
import { Modal } from '../common/Modal';
import { SocialSharingProps, SocialSharingViewType } from './models';
import { SocialSharingBase } from './partials';

export const SocialSharing = ({
  className,
  buttonClassName = 'social-sharing__button',
  icons,
  viewType = SocialSharingViewType.Base,
  showTextLabels = false,
  content: { buttons, openModalButton, modalTitle },
  handleSocialButtonClick,
  handleSocialDialogClose,
  CloseButtonIcon,
  titleLevel,
}: SocialSharingProps) => {
  const props = {
    buttons,
    icons,
    buttonClassName,
    handleSocialButtonClick,
    handleSocialDialogClose,
    showTextLabels,
  };
  const classWrapper = cx(className, {
    'social-sharing-in-modal': viewType === SocialSharingViewType.Modal,
  });
  const [state, setState] = useState(false);
  let view: JSX.Element | null;

  switch (viewType) {
    case SocialSharingViewType.Base:
      view = (
        <div className={classWrapper}>
          <SocialSharingBase {...props} />
        </div>
      );
      break;
    case SocialSharingViewType.Modal:
      view = (
        <div className={classWrapper}>
          <Button
            Icon={Icon}
            viewType={ButtonViewType.icon}
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
            title={modalTitle}
            titleLevel={titleLevel}
            close={() => {
              setState(false);
            }}
          >
            <SocialSharingBase {...props} />
          </Modal>
        </div>
      );
      break;
    default:
      view = (
        <div className={classWrapper}>
          <SocialSharingBase {...props} />
        </div>
      );
      break;
  }

  return view;
};

export default SocialSharing;
