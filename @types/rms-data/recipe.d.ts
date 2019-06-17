declare namespace RMSData {
  interface Recipe {
    id: string;
    shortTitle: string;
    inFavorite?: boolean;
    cookingTime: number;
    preparationTime: number;
    creationTime: Date;
    ingredients: RMSData.Ingredient[];
    categories: TagCategory[];
  }
}
