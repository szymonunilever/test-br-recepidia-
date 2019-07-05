import { FluidObject } from 'gatsby-image';
import { ResultsStore } from '../../models';

export interface FinishPanelProps {
  title: string;
  subheading: string;
  description: string;
  image: {
    fluid: FluidObject;
    alt: string;
  };
  primaryButtonLabel: string;
  actionCallback?: () => void;
  resultsStore: ResultsStore;
  containerClass: string;
  stepId: string;
}
