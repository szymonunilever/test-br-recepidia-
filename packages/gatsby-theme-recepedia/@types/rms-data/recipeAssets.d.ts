declare namespace RMSData {
  export interface RecipeAssets {
    images: RecipeAssetsImages;
    videos?: RecipeAssetsVideos;
  }

  export interface RecipeAssetsImages {
    default: RecipeAssetsImagesDefault;
  }
  export interface RecipeAssetsVideos {
    default?: RecipeAssetsVideosDefault;
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
  export interface RecipeAssetsVideosDefault {
    url: string;
  }
}
