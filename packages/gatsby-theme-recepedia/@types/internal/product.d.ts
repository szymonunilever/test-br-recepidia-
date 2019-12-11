declare namespace Internal {
  interface Product extends ProductData.Product {
    averageRating?: string | number;
    fields: {
      slug: string;
    };
  }
}
