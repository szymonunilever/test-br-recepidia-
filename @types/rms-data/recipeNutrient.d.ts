declare namespace RMSData {
  export interface RecipeNutrient {
    dvPercent?: number | string | null;
    position: number | string;
    messurementUnit: string;
    displayUnit: string;
    dv: string;
    rawValue: number | string;
    name: string;
    ri: string;
    riPercent: string;
    quantity: number | string;
    description: string;
    epercent?: string | null;
  }
}
