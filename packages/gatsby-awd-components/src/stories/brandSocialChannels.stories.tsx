import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrandSocialChannels } from '../index';
import content from '../mocks/brandSocialChannels.json';
import { ReactComponent as FbIcon } from 'src/svgs/inline/facebook.svg';
import { ReactComponent as TwitterIcon } from 'src/svgs/inline/twitter.svg';
import { ReactComponent as InstaIcon } from 'src/svgs/inline/instagram.svg';

const list = {
  facebook: <FbIcon />,
  twitter: <TwitterIcon />,
  instagram: <InstaIcon />,
};

const config = {
  displayLabel: false,
};

storiesOf('Generic/BrandSocialChannels', module).add('default', () => (
  <BrandSocialChannels listIcons={list} content={content} {...config} />
));
