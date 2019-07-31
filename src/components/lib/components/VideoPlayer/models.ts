import { UnileverLibraryComponent } from '../globalModels';

export interface VideoPlayerProps
  extends UnileverLibraryComponent<AppContent.VideoPlayer.Content> {
  width?: number;
  height?: number;
  allowFullScreen?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PlayIcon?: any;
}
