import { useEffect } from 'react';
import { pushEvent } from './index.js';
import { ctConstants } from './ct-constants.js';

const DIAGNOSTIC_LABEL = `DIAGNOSTIC TOOL - `;

const trackQuiz = (label: string) => {
  pushEvent({
    type: ctConstants.diagtooleve,
    category: {
      primaryCategory: ctConstants.engagement,
    },
    subcategory: 'Interest',
    action: ctConstants.diagtooleve,
    label: `${DIAGNOSTIC_LABEL}${label}`,
  });
};

export const useQuizTracking = (step: number) => {
  useEffect(() => {
    trackQuiz(`Step ${step}`);
  }, [step]);

  useEffect(
    () => () => {
      trackQuiz(`Completed`);
    },
    []
  );
};
