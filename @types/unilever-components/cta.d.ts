declare namespace UnileverComponents {
  type CTAViewType = 'Button' | 'Link';

  interface CTAContent extends BaseContent {
    label: string;
    linkTo?: string;
    type: CTAViewType;
  }
}
