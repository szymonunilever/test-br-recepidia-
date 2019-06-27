import React from 'react';
import styles from './ProgressBar.module.scss';
import { ProgressBarProps } from './models';

const ProgressBar = ({ percentage = 0 }: ProgressBarProps) => {
  return (
<<<<<<< HEAD
    <div className={styles['progress-bar'] + ' progress-bar'}>
      <div
        className={styles['progress-bar__content'] + ' progress-bar__content'}
=======
    <div className={styles['progress-bar']}>
      <div
        className={styles['progress-bar__content']}
>>>>>>> develop
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
