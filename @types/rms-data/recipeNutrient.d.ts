declare namespace RMSData {
  export interface RecipeNutrient {
    dvPercent?: number;
    position: number;
    messurementUnit: string;
    displayUnit: string;
    dv: string;
    rawValue: number;
    name: string;
    ri: string;
    riPercent: string;
    quantity: number;
    description: string;
    epercent?: string;
  }
}
