declare namespace Internal {
  export interface Category extends AppContent.Category.Content {
    children?: Category[];
    localImage: Internal.LocalImage;
    fields: {
      slug: string;
    };
  }
}
