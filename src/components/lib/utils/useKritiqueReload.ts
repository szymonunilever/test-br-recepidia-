import get from 'lodash/get';
import debounce from 'lodash/debounce';

export const reloadKritique = () => {
  const kritiqueWidget = get(window, 'ratingReview.widget');
  kritiqueWidget && kritiqueWidget.rrReloadWidget();
};

const reloadKritiqueWidget = () => debounce(reloadKritique, 200);

export default reloadKritiqueWidget;
