declare namespace RMSData {
  export interface IngredientGroup {
    title: string;
    list: Ingredient[];
  }

  export interface Ingredient {
    productId?: number | string | null;
    originalProductId?: number | string;
    measurementUnit?: string;
    quantity?: number;
    multiple?: number;
    description: string;
  }
}
