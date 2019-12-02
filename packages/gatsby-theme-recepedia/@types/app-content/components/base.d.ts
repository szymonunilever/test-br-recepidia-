declare namespace AppContent {
  interface BaseContent {
    /**
     * Name/ID of view the content relates to. Has to be unique in terms of single page
     */
    view?: string;
  }

  interface BaseComponent {
    /**
     * Name/type of component the model relates to
     */
    name: 'Hero' | 'RecipeListing' | 'PageListing';

    /**
     * Component content taken from CMS
     */
    content: BaseContent;
  }
}
