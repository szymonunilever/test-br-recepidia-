declare namespace AppContent {
  interface Page {
    // title: string;
    type: string;
    components: {
      items: AppContent.BaseComponent[];
    };
    seo: {
      title: string;
      description: string;
      meta: MetaTag[];
      lang: string;
    };

    /**
     * Gatsby should use this dynamic value for page URL
     */
    relativePath: string;
  }

  interface MetaTag {
    [key: string]: string;
    content: string;
  }
}
