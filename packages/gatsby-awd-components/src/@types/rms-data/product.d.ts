declare namespace RMSData {
  export interface Product {
    allergy: string[];
    brand: string;
    id: string | number;
    ingredients: RMSData.IngredientGroup[];
    longPageDescription: string;
    productId: string | number;
    productName: string;
    productTags: Internal.Tag[]
  }
}
