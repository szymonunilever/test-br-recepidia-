import { useEffect } from 'react';
import { pushEvent } from './index.js';
import { ctConstants } from './ct-constants.js';

const DIAGNOSTIC_LABEL = `DIAGNOSTIC TOOL - `;

export const trackQuiz = (label: string) => {
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
