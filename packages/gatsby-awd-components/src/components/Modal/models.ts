import { ReactNode } from 'react';
import ReactModal from 'react-modal';
import { Icon, titleLevel } from '../../models';

export interface ModalProps extends ReactModal.Props {
  className?: string;
  children: ReactNode | ReactNode[];
  closeBtn?: Icon;
  close?: () => void;
  titleLevel?: titleLevel;
  title?: string;
}
