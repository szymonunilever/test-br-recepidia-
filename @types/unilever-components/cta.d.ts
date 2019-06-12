declare namespace UnileverComponents {
  type CTAViewType = 'Button' | 'Link';

  interface CTAContent {
    label: string;
    linkTo?: string;
    type: CTAViewType;
  }
}
