declare namespace RMSData {
  export interface Ingredient {
    productId?: number | string | null;
    originalProductId?: number | string;
    productName?: string;
    quantity?: number;
    multiple?: number;
    description: string;
  }
}
