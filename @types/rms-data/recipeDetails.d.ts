declare namespace RMSData {
  export interface RecipeDetails {
    serves?: number;
    totalTime?: number;
    preparationTime?: number;
    [key: string]: number | undefined;
  }
}
