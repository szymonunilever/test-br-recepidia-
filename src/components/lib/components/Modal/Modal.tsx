import React, { useEffect } from 'react';
import { ModalProps } from './models';
import cx from 'classnames';
import ReactModal from 'react-modal';
import Text from '../Text/Text';
import { TagName } from '../Text/index';

const Modal = ({
  isOpen,
  className,
  close,
  closeBtn,
  titleLevel = 2,
  title = '',
  ...props
}: ModalProps) => {
  const wrapClasses = cx(className, 'modal');
  useEffect(() => {
    ReactModal.setAppElement('body');
  }, []);
  return (
    <ReactModal
      {...props}
      isOpen={isOpen}
      portalClassName={wrapClasses}
      onRequestClose={close}
      overlayClassName="modal__overlay"
      className="modal__content"
      bodyOpenClassName="modal--open"
    >
      <div className="modal__header">
        <Text
          //@ts-ignore
          tag={TagName[`h${titleLevel}`]}
          text={title}
          className="modal__title"
        />
      </div>
      {props.children}
      <button onClick={close} className="modal__btn-close">
        {closeBtn}
      </button>
    </ReactModal>
  );
};

export default Modal;
