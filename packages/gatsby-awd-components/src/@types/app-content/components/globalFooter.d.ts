declare namespace AppContent.GlobalFooter {
  interface Content extends BaseContent {
    lists: MenuList[];
    copyrightText: string;
  }

  interface MenuItem {
    name: string;
    path: string;
  }

  interface MenuList {
    title?: string;
    items: MenuItem[];
  }
}
