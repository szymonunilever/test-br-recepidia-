import ReactModal from 'react-modal';

export interface ModalProps extends ReactModal.Props {
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeBtn?: any;
  close?: () => void;
}
