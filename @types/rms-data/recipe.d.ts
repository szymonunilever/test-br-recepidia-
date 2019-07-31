declare namespace RMSData {
  export interface Recipe {
    id: string;
    title: string;
    description: string;
    creationTime: Date;
    recipeDetails: RMSData.RecipeDetails;
    assets: RMSData.RecipeAssets;
    ingredients: RMSData.Ingredient[];
    methods: RMSData.CookingMethod[];
    nutrients: RMSData.RecipeNutrient[];
    nutrientsPerServing: RMSData.RecipeNutrient[];
    nutrientsPer100g: RMSData.RecipeNutrient[];
    // calculatedServingWeightg: number;
    // rating?: RMSData.Rating;
    // relatedRecipes?: RMSData.Recipe[];
    /**
     * The property aggregates all tags from the following RMS fields:
     * annualEvents, budgets, cookingMethods, courses, cuisines,
     * difficulties, dishes, mainIngredients, occasions, seasons,
     * spiciness, suitability, timesOfDay, dietary
     * */
    tagGroups: TagGroupings[];
  }
}
