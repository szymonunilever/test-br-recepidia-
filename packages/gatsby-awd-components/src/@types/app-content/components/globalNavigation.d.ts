declare namespace AppContent.GlobalNavigation {
  interface Content extends BaseContent {
    list: MenuItem[];
  }
  interface MenuItem {
    name: string;
    path?: string;
    children?: MenuItem[];
  }
}
