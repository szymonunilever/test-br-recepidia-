declare namespace Internal {
  interface Product extends RMSData.Product {
    averageRating?: number;
    images: Internal.LocalImage[];
    fields: {
      slug: string;
    };
  }
}
