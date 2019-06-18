declare namespace AppContent.GlobalFooter {
  interface Content extends BaseContent {
    list: MenuItem[];
    copyrightText: string;
  }

  interface MenuItem {
    name: string;
    path: string;
  }
}
