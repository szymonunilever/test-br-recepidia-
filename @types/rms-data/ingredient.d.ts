declare namespace RMSData {
  export interface Ingredient {
    product_id?: number | string;
    original_product_id?: number | string;
    productName?: string;
    quantity?: number;
    multiple?: number;
    description: string;
  }
}
