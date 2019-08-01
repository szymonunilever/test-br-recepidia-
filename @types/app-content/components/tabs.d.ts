declare namespace AppContent.Tabs {
  interface Content extends BaseContent {
    tabs: Tab[];
  }
  interface Tab extends BaseContent {
    title: string;
    view: string;
  }
}
