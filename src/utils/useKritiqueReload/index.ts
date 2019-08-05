import { useEffect } from 'react';
import { get } from 'lodash';

const useKritiqueReload = (trackedState: any = []) => {
  useEffect(() => {
    const kritiqueWidget = get(window, 'ratingReview.widget');
    kritiqueWidget && kritiqueWidget.rrReloadWidget();
  }, [trackedState]);
};

export default useKritiqueReload;
