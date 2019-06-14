declare namespace AppContent {
  interface RecipeListingContent extends BaseContent {
    title?: string;
    cta?: AppContent.CTAContent;
    resultLabel?: string;
    resultLabelPlural?: string;
    optionLabels?: AppContent.RecipeListingContent.OptionLabelsContent;
    sortSelectPlaceholder?: string;
    nullResult: AppContent.RecommendationsContent;
    filtersCta?: AppContent.RecipeListingContent.FiltersCTA;
  }
}
