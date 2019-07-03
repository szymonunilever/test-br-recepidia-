import ReactModal from 'react-modal';
import { titleLevel } from '../globalModels';

export interface ModalProps extends ReactModal.Props {
  className?: string;
  children: JSX.Element;
  closeBtn?: JSX.Element | string;
  close?: () => void;
  titleLevel?: titleLevel;
  title?: string;
}
