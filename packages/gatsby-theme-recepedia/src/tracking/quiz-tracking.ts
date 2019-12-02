import { pushEvent, loaded } from './index.js';
import { ctConstants } from './ct-constants.js';

const DIAGNOSTIC_LABEL = `DIAGNOSTIC TOOL - `;

interface TrackingProps {
  label: string;
  result?: string;
  question?: string;
  answer?: string;
}

interface EventInfo {
  type: string;
  eventAction?: string;
  eventLabel?: string;
  eventValue?: number;
}

export const trackQuiz = ({
  label,
  result = '',
  question,
  answer,
}: TrackingProps) => {
  let eventInfo: EventInfo = {
    type: ctConstants.diagtooleve,
  };

  if (result === `Complete`) {
    eventInfo = {
      type: ctConstants.trackEvent,
      eventAction: ctConstants.DiagnosticToolResults,
      eventLabel: 'DIAGNOSTIC TOOL NAME-EVENT LABEL',
      eventValue: 1,
    };
  }
  const event = {
    eventInfo,
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
