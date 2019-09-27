import get from 'lodash/get';
import debounce from 'lodash/debounce';

const reloadKritique = () => {
  const kritiqueWidget = get(window, 'ratingReview.widget');
  kritiqueWidget && kritiqueWidget.rrReloadWidget();
};

const reloadKritiqueWidget = debounce(reloadKritique, 200, { maxWait: 1000 });

export default reloadKritiqueWidget;
