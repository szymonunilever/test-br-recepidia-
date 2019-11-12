import { pushEvent, loaded } from './index.js';
import { ctConstants } from './ct-constants.js';

const DIAGNOSTIC_LABEL = `DIAGNOSTIC TOOL - `;

interface TrackingProps {
  label: string;
  result?: string;
  question?: string;
  answer?: string;
}

export const trackQuiz = ({
  label,
  result = '',
  question,
  answer,
}: TrackingProps) => {
  const event = {
    eventInfo: {
      type: ctConstants.diagtooleve,
    },
    category: {
      primaryCategory: ctConstants.engagement,
    },
    subcategory: 'Interest',
    action: ctConstants.diagtoolcta,
    label: `${DIAGNOSTIC_LABEL}${label}`,
  };

  if (loaded()) {
    digitalData.component.push({
      attributes: {
        position: '',
        listPosition: '',
        componentVariant: '',
        DTResult: result,
        DTMSARes: '',
        subattributes: [
          {
            DTQns: question,
            DTAns: answer,
            DTQnsID: '',
            DTAnsID: '',
          },
        ],
      },
    });
  }
  pushEvent(event);
};
