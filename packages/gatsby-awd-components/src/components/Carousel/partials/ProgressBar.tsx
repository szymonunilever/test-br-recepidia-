import React from 'react';
import theme from './ProgressBar.module.scss';
import { ProgressBarProps } from './models';

const ProgressBar = ({ percentage = 0 }: ProgressBarProps) => {
  return (
    <div className={theme.progressBar + ' progress-bar'}>
      <progress
        aria-label="progress"
        role="progressbar"
        className={theme.progressBar__content + ' progress-bar__content'}
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
