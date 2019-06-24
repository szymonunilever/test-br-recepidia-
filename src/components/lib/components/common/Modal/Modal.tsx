import React from 'react';
import { ModalProps } from './models';
import cx from 'classnames';
import ReactModal from 'react-modal';

const Modal = ({
  isOpen,
  className,
  close,
  closeBtn,
  ...props
}: ModalProps) => {
  const wrapClasses = cx(className, 'modal');
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
      {props.children}
      <button onClick={close} className="modal__btn-close">
        {closeBtn}
      </button>
    </ReactModal>
  );
};

export default Modal;