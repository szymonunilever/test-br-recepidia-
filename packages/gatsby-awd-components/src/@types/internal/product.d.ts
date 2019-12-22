declare namespace Internal {
  interface Product extends RMSData.Product {
    averageRating?: number;
    localImage: Internal.LocalImage;
    fields: {
      slug: string;
    };
  }
}
