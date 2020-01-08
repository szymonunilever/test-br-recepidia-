declare namespace AppContent.Article {
  interface Content {
    title: string;
    shortDescription?: string;
    articleText: RichTextContent;
    content: string;
    assets: Asset<ImageContent | VideoPlayer.Content>[];
    tagGroups: RMSData.TagGroupings[];
    brand?: string;
    tags: Internal.Tag[];
  }
}
