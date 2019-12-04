declare namespace AppContent.RecipeListing {
  interface Content extends BaseContent {
    title?: string;
    cta?: AppContent.CTAContent;
    resultLabel?: string;
    resultLabelPlural?: string;
    optionLabels?: OptionLabels;
    sortSelectPlaceholder?: string;
    nullResult?: NullResult;
    filtersPanel?: FiltersPanel;
    staticList?: number[];
    filtersButtonLabel?: string;
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

  interface FiltersPanel {
    title?: string;
    ctas: {
      reset: AppContent.CTAContent;
      apply: AppContent.CTAContent;
    };
  }

  interface NullResult {
    title?: string;
    subtitle?: string;
    textList: string[];
  }
}
