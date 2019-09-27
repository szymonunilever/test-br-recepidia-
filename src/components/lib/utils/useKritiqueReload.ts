import get from 'lodash/get';
import debounce from 'lodash/debounce';

const reloadKritique = () => {
  const kritiqueWidget = get(window, 'ratingReview.widget');
  kritiqueWidget && kritiqueWidget.rrReloadWidget();
};

const reloadKritiqueWidget = () =>
  debounce(reloadKritique, 300, {
    trailing: true,
  });

export default reloadKritiqueWidget;
