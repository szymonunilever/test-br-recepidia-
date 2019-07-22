import { storiesOf } from '@storybook/react';
import React from 'react';
import AdaptiveImage from 'src/components/lib/components/AdaptiveImage';
import localImage from './assets/localImage';

const image = {
  url:
    'https://scm-assets.constant.co/scm/unilever/1d398653b55393fd6da9bff8ea193338/d4ae1ef9-bfba-401d-bdc8-89ccb70a8e4f.jpg',
  alt: 'Alt',
};

storiesOf('Components', module).add('AdaptiveImage', () => (
  <AdaptiveImage
    className="custom-class"
    localImage={localImage}
    alt={image.alt}
    url={image.url}
  />
));
