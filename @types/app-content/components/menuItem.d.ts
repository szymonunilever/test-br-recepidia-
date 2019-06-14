declare namespace AppContent {
  interface MenuItemContent extends BaseContent {
    name: string;
    path?: string;
    children?: MenuItemContent[];
  }
}
