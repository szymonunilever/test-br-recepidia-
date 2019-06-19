declare namespace RMSData {
  export interface RecipeAssets {
    images: {
      /**
       * Default image that will be shown the first
       */
      default: RMSData.RecipeImage;
      /**
       * Other images from collection
       */
      versions: RMSData.RecipeImage[];
    };
    video?: {
      url: string;
    };
  }
}
