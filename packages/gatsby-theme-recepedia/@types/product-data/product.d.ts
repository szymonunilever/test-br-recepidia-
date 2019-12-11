declare namespace ProductData {
  export interface NutritionFactItem {
    [key: string]: string;
  }

  export interface Product {
    id: number | string;
    brand: string;
    productName: string;
    longPageDescription: string;
    ingredients: string;
    allergy: string;
    nutritionFacts: NutritionFactItem[];
    productTags: string[];
    images: string[];
  }
}
