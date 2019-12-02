declare namespace AppContent.Category {
  interface Content {
    name: string;
    id?: string | number;
    image: AppContent.ImageContent;
    title: string;
    description: string;
    tags?: RMSData.Tag[];
    categories?: Content[];
    recipeDetails?: RecipeDetails;
    inNavigation?: boolean;
    inFooter?: boolean;
    showOnHomepage: number;
    categoryOrder: number;
  }
  interface RecipeDetails {
    serves?: string | null;
    cookTime?: string | null;
    totalTime?: string | null;
    preparationTime?: string | null;
    [key: string]: string | null | undefined;
  }
}
