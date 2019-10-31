import { pushEvent } from './';
import { ctConstants } from './ct-constants';

export const pageViewTracking = () => {
  pushEvent({
    eventInfo: {
      type: ctConstants.trackAjaxPageLoad,
      eventLabel: document.title,
      eventValue: 1,
    },
    category: {
      primaryCategory: ctConstants.other,
    },
    subcategory: 'Read',
  });
};
