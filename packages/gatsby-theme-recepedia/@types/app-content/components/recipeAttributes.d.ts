declare namespace AppContent.RecipeAttributes {
  interface Content {
    labels: {
      serves?: LabelItem;
      makes?: LabelItem;
      difficulties?: LabelItem;
      cookingTime?: LabelItem;
      preparationTime?: LabelItem;
      waitingTime?: LabelItem;
      marinateTime?: LabelItem;
      ovenTime?: LabelItem;
      freezeTime?: LabelItem;
      chillTime?: LabelItem;
      brewTime?: LabelItem;
      totalTime?: LabelItem;
      [key: string]: LabelItem | undefined;
    };
  }
  interface LabelItem {
    title?: string;
    units?: string;
    unitsPlural?: string;
  }
}
