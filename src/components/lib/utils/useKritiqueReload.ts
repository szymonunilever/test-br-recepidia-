import { useEffect } from 'react';
import { get } from 'lodash';

export const reloadKritiqueWidget = () => {
  const kritiqueWidget = get(window, 'ratingReview.widget');
  kritiqueWidget && kritiqueWidget.rrReloadWidget();
};

const useKritiqueReload = (trackedState: React.ComponentState = []) => {
  let timerId;
  window.clearTimeout(timerId);

  useEffect(() => {
    timerId = setTimeout(() => {
      reloadKritiqueWidget();
    }, 50);
  }, trackedState);
};

export default useKritiqueReload;
