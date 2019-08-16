declare namespace Internal {
  interface Recipe extends RMSData.Recipe {
    inFavorite?: boolean;
    localImage: Internal.LocalImage;
    fields: {
      slug: string;
    };
    recipeId: number;
  }
}
