import { ResultsStore } from '../../models';
import { AdaptiveImageProps } from '../../../AdaptiveImage/models';

export interface IntroductionPanelProps {
  title: string;
  description: string;
  image: AdaptiveImageProps;
  primaryButtonLabel: string;
  secondaryButtonLabel?: string;
  actionCallback?: () => void;
  resultsStore: ResultsStore;
  containerClass: string;
  stepId: string;
}
