import React from 'react';
import styles from './ProgressBar.module.scss';
import { ProgressBarProps } from './models';

const ProgressBar = ({ percentage = 0 }: ProgressBarProps) => {
  return (
    // <div className={styles['progress-bar'] + ' progress-bar'}>
    <div className={styles.progressBar + ' progress-bar'}>
      <div
        className={styles.progressBar__content + ' progress-bar__content'}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
