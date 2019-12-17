import { storiesOf } from '@storybook/react';
import React from 'react';
import { AdaptiveImage } from '../index';
// import localImage from './assets/localImage';
import localImage from './assets/localImageMulti';
// import { findLastIndex } from 'lodash-es';

const image = {
  url:
    'https://scm-assets.constant.co/scm/unilever/1d398653b55393fd6da9bff8ea193338/bab4fc1b-c269-44c1-8d60-367626f8b029.jpg',
  alt: 'Alt',
};

storiesOf('Generic/AdaptiveImage', module)
  .add(
    'default',
    () => (
      <AdaptiveImage
        className="custom-class"
        localImage={localImage}
        alt={image.alt}
      />
    ),
    { inline: false }
  )
  .add('with link', () => (
    <AdaptiveImage
      className="custom-class"
      localImage={localImage}
      alt={image.alt}
      link={'/'}
    />
  ))
  .add('with sizes specified', () => (
    <div>
      <AdaptiveImage
        className="custom-class"
        localImage={localImage}
        alt={image.alt}
        sizes="(max-width: 320px) 100vw, 200px"
      />
      <p>
        Note: image width is set to 200px. If browser cache has the same image
        of bigger size, it will be used instead of small image.
      </p>
    </div>
  ));
