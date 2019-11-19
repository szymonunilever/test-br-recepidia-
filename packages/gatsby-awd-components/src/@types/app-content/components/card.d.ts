declare namespace AppContent {
  interface Card extends BaseContent {
    title: string;
    texts: string[];
    type: 'phone' | 'address' | 'text';
    cta?: AppContent.CTAContent;
  }
}
