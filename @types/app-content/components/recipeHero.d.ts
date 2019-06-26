declare namespace AppContent {
  interface RecipeHeroContent extends BaseContent {
    title?: string;
    description?: string;
    recipeDetails?: object;
    image?: AppContent.ImageContent;
  }
}
