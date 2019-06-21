import { storiesOf } from '@storybook/react';
import React from 'react';
import BrandSocialChannels from 'src/components/lib/BrandSocialChannels';

import Icon from 'src/svgs/inline/placeholder.svg';

const content = {
  className: 'custom-class',
  socialItems: {
    facebook: {
      label: 'Facebook',
      url: 'https://www.facebook.com/',
    },
    instagram: {
      label: 'Instagram',
      url: 'https://www.instagram.com/',
    },
    twitter: {
      label: 'Twitter',
      url: 'https://twitter.com/',
    },
    youtube: {
      label: 'YouTube',
      url: 'https://www.youtube.com/',
    },
  },
};

const list = {
  facebook: <Icon />,
  instagram: <Icon />,
  twitter: <Icon />,
  youtube: <Icon />,
};

const config = {
  displayLabel: false,
};

storiesOf('Components/BrandSocialChannels', module).add('default', () => (
  <BrandSocialChannels listicons={list} content={content} {...config} />
));
