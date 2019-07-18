declare namespace AppContent.VideoPlayer {
  interface Content extends BaseContent {
    preview?: VideoPreviewProps;
    videoId: string;
    title?: Title;
    description?: string;
  }
  interface VideoPreviewProps {
    previewImage: Internal.LocalImage;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    playIcon: any;
  }
  interface Title {
    value: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    titleLevel: any;
  }
}
