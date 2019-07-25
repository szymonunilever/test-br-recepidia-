declare namespace Internal {
  interface Recipe extends RMSData.Recipe {
    inFavorite?: boolean;
    fields: {
      slug: string;
    };
    recipeId: string;
  }
}
