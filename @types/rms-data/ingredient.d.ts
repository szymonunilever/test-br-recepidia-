declare namespace RMSData {
  export interface Ingredient {
    product_id?: number | string;
    productName?: string;
    quantity: number;
    multiple: number;
    original_product_id?: number | string;
    description: string;
  }
}
