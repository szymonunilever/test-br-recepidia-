import React, { useState } from 'react';
import { VideoPlayerProps } from './models';
import { Tab } from '../Tabs';
import AdaptiveImage from '../AdaptiveImage';
import { Text, TagName } from '../Text';

const VideoPlayer = ({
  width = 640,
  height = 360,
  allowFullScreen = false,
  content,
}: VideoPlayerProps) => {
  const { title, preview, videoId } = content;
  const [showPreview, setShowPreview] = useState(!!preview);
  const [autoPlay, setAutoPlay] = useState(0);
  const handlePlayButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setShowPreview(!showPreview);
    setAutoPlay(1);
  };
  return (
    <div data-componentname="video-player" className="video-player">
      {title && (
        <div className="video-player__header">
          <Text
            //@ts-ignore
            tag={TagName[`h${title.titleLevel}`]}
            text={title.value}
          />
        </div>
      )}
      {showPreview && (
        <div className="video-player__preview-tab">
          <Tab view="VideoPlayerCustomThumbnail" active={showPreview}>
            <div className="playback-icon" onClick={handlePlayButtonClick}>
              {preview && <preview.playIcon />}
            </div>
            <AdaptiveImage
              className={'video-player__preview-image'}
              alt={'YouTube preview'}
              localImage={
                preview
                  ? preview.previewImage
                  : ((null as unknown) as Internal.LocalImage)
              }
            />
          </Tab>
        </div>
      )}
      <Tab
        view="VideoPlayerTab"
        className={'video-player__player-tab'}
        active={preview ? !showPreview : true}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay}`}
          width={width}
          height={height}
          allowFullScreen={allowFullScreen}
          allow="autoplay"
        />
      </Tab>
    </div>
  );
};

export default VideoPlayer;
