import cx from 'classnames';
import React, { FunctionComponent, useState } from 'react';
import Button from '../Button';
import { Modal } from '../Modal';
import { SocialSharingProps, SocialSharingViewType } from './models';
import { SocialSharingBase } from './partials';
import { iconNormalize } from '../../utils';
import theme from './SocialSharing.module.scss';

export const SocialSharing: FunctionComponent<SocialSharingProps> = ({
  className,
  buttonClassName = cx(theme.socialSharing__button, 'social-sharing__button'),
  icons,
  viewType = SocialSharingViewType.Base,
  showTextLabels = false,
  content: { buttons, openModalButton, modalTitle },
  handleSocialButtonClick,
  handleSocialDialogClose,
  CloseButtonIcon,
  titleLevel,
  WidgetScript,
  OpenModelButtonIcon,
}) => {
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
  const [state, setState] = useState({ openModal: false, addThisReady: false });
  let view: JSX.Element | null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addThisReady = (e: Event) => {
    if (e) {
      setState({ ...state, addThisReady: true });
    }
  };

  switch (viewType) {
    case SocialSharingViewType.Modal:
      view = (
        <div className={classWrapper}>
          <Button
            Icon={iconNormalize(OpenModelButtonIcon)}
            className="social-sharing__dialog-open-button"
            content={openModalButton}
            onClick={() => {
              setState({ ...state, openModal: true });
            }}
            attributes={{ 'aria-label': 'social sharing' }}
          />

          <Modal
            isOpen={state.openModal}
            className={cx(
              theme.socialSharing__dialog,
              'social-sharing__dialog'
            )}
            closeBtn={iconNormalize(CloseButtonIcon)}
            title={modalTitle}
            titleLevel={titleLevel}
            close={() => {
              setState({ ...state, openModal: false });
            }}
          >
            <>
              {WidgetScript && <WidgetScript callback={addThisReady} />}
              <div className={classWrapper}>
                <SocialSharingBase
                  {...props}
                  addThisReady={state.addThisReady}
                />
              </div>
            </>
          </Modal>
        </div>
      );
      break;
    default:
      view = (
        <>
          <WidgetScript callback={addThisReady} />
          <div className={classWrapper}>
            <SocialSharingBase {...props} addThisReady={state.addThisReady} />
          </div>
        </>
      );
      break;
  }

  return view;
};

export default SocialSharing;
