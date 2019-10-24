import { ResultsStore } from '../../models';
import { AdaptiveImageProps } from '../../../AdaptiveImage/models';

export interface FinishPanelProps {
  title: string;
  subheading: string;
  description: string;
  image: AdaptiveImageProps;
  primaryButtonLabel: string;
  actionCallback?: () => void;
  resultsStore: ResultsStore;
  containerClass: string;
  stepId: string;
}
