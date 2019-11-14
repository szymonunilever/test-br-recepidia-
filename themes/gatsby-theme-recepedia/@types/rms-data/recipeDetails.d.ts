declare namespace RMSData {
  export interface RecipeDetails {
    serves?: number;
    cookTime?: number;
    totalTime?: number;
    preparationTime?: number;
    [key: string]: number | undefined;
  }
}
