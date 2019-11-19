import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import VideoPlayer, { VideoPlayerProps } from '../index';
import toJson from 'enzyme-to-json';
import Icon from 'src/svgs/inline/plus.svg';
import { preview } from '../../../stories/videoPlayer.stories';

describe('<VideoPlayer />', () => {
  let wrapper: ReactWrapper;
  const playerProps: VideoPlayerProps = {
    width: 720,
    height: 480,
    allowFullScreen: true,
    PlayIcon: Icon,
    content: {
      title: { value: 'Test video', titleLevel: 2 },
      videoId: 'lWDRXsTaIHY',
      description: 'test description',
      preview,
    },
  };

  beforeEach(() => {
    wrapper = mount(<VideoPlayer {...playerProps} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('matches the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
