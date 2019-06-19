import ReactModal from 'react-modal';

export interface ModalProps extends ReactModal.Props {
  className?: string;
  children: JSX.Element;
  closeBtn?: JSX.Element | string;
  close?: () => void;
}
