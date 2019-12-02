declare namespace AppContent.SearchListing {
  interface Content extends BaseContent {
    title: string;
  }

  interface NullResult {
    title?: string;
    subtitle?: string;
    textList: string[];
  }
}
