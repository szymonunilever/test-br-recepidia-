import get from 'lodash/get';
import debounce from 'lodash/debounce';

export const reloadKritique = () => {
  const kritiqueWidget = get(window, 'ratingReview.widget');
  kritiqueWidget && kritiqueWidget.rrReloadWidget();
  // @ts-ignore
  window.isLoadKritique = true;
};

export const reloadKritiqueWidget = debounce(reloadKritique, 500);

export default reloadKritiqueWidget;
