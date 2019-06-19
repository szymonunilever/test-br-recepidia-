import React from 'react';
import styles from './ProgressBar.module.scss';
import { ProgressBarProps } from './models';

const ProgressBar = ({ percentage = 0 }: ProgressBarProps) => {
  return (
    <div className={styles.progress_bar}>
      <div
        className={styles.progress_bar_content}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
