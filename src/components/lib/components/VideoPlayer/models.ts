import { UnileverLibraryComponent } from '../common/globalModels';

export interface VideoPlayerProps
  extends UnileverLibraryComponent<AppContent.VideoPlayer.Content> {
  width?: number;
  height?: number;
  allowFullScreen?: boolean;
}
