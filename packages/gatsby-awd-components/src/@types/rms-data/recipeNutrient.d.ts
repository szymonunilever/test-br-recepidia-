declare namespace RMSData {
  export interface RecipeNutrient {
    rawDvPercent?: number | string | null;
    position: number | string;
    unit: string;
    displayUnit: string;
    dv: string;
    rawValue: number | string;
    name: string;
    ri: string;
    description: string;
    epercent?: string | null;
    isCore?: boolean;
    value?: number;
    rawRiPercent?: number;
  }
}
