declare namespace Internal {
  interface Article extends AppContent.Article.Content {
    id: string;
    assets: Asset<AppContent.ImageContent | AppContent.VideoPlayer.Content>[];
    fields: {
      slug: string;
    };
  }

  interface Asset<T>
    extends AppContent.Asset<
      AppContent.ImageContent | AppContent.VideoPlayer.Content
    > {
    localImage?: Internal.LocalImage;
  }
}
