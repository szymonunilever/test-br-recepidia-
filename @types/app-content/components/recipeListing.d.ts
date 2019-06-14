declare namespace AppContent.RecipeListing {
  interface Content extends BaseContent {
    title?: string;
    cta?: AppContent.CTAContent;
    resultLabel?: string;
    resultLabelPlural?: string;
    optionLabels?: OptionLabels;
    sortSelectPlaceholder?: string;
    nullResult: NullResult;
    filtersCta?: FiltersCTA;
  }
  interface OptionLabels {
    preparationTime: string;
    cookingTime: string;
    averageRating: string;
    newest: string;
    recentlyUpdated: string;
    title: string;
    [key: string]: string;
  }

  interface FiltersCTA {
    resetLabel: AppContent.CTAContent;
    applyLabel: AppContent.CTAContent;
  }

  interface NullResult {
    title?: string;
    subtitle?: string;
    textList: string[];
  }
}
