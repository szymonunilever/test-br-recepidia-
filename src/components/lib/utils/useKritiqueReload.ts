import get from 'lodash/get';
import isBrowser from './isBrowser';

export const reloadKritiqueWidget = () => {
  const kritiqueWidget = get(window, 'ratingReview.widget');
  kritiqueWidget && kritiqueWidget.rrReloadWidget();
};

const reloadKritiqueWidgetWithTimeout = (timeout = 50) => {
  let timerId;
  isBrowser() && timerId && window.clearTimeout(timerId);

  timerId = setTimeout(() => {
    reloadKritiqueWidget();
  }, timeout);
};

export default reloadKritiqueWidgetWithTimeout;
