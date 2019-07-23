declare namespace AppContent {
  interface Asset<T> {
    type: 'Image' | 'Video';
    content: T;
  }
}
