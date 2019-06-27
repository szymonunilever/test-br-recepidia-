declare namespace RMSData {
  export interface RecipeDetails {
    serves?: number;
    makes?: number;
    servingSize?: number;
    readyTime?: number;
    totalTime?: number;
    cookingTime?: number;
    preparationTime?: number;
    ovenTime?: number;
    restTime?: number;
    marinateTime?: number;
    freezeTime?: number;
    chillTime?: number;
    brewTime?: number;
    [key: string]: number | undefined;
  }
}
