declare namespace RMSData {
  export interface Ingredient {
    messurementUnit?: string;
    productId: number | string | null;
    productName?: string;
    quantity?: number;
    multiple?: number;
    originalProductId?: number | string;
    description: string;
  }
}
