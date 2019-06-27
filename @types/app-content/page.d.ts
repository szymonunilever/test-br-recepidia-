declare namespace AppContent {
  interface Page {
    title: string;
    type: 'Home' | 'RecipeCategory' | 'Search' | 'ContactUs' | 'ContactForm';
    components: {
      items: AppContent.BaseComponent[];
    };
    seo: {
      keywords: string[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      meta: any;
    };

    /**
     * Gatsby should use this dynamic value for page URL
     */
    path: string;
  }
}
