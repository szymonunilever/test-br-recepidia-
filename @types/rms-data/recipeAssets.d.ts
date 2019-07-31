declare namespace RMSData {
  export interface RecipeAssets {
    images: RecipeAssetsImages;
  }

  export interface RecipeAssetsImages {
    default: RecipeAssetsImagesDefault;
  }

  export interface RecipeAssetsImagesDefault {
    base64: string;
    aspectRatio: number;
    width: number;
    height: number;
    src: string;
    srcWebp: string;
    srcSet: string;
    srcSetWebp: string;
    sizes: string;
  }
}
