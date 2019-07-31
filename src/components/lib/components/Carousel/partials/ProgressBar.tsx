import React from 'react';
import styles from './ProgressBar.module.scss';
import { ProgressBarProps } from './models';

const ProgressBar = ({ percentage = 0 }: ProgressBarProps) => {
  return (
    // <div className={styles['progress-bar'] + ' progress-bar'}>
    <div className={styles.progressBar + ' progress-bar'}>
      <progress
        aria-label="progress"
        role="progressbar"
        className={styles.progressBar__content + ' progress-bar__content'}
        style={{ width: `${percentage}%` }}
        value={`${percentage}`}
        max="100"
      >
        {percentage}% complete
      </progress>
    </div>
  );
};

export default ProgressBar;
