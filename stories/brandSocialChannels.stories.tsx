import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrandSocialChannels } from 'src/components/lib';
import content from 'src/components/data/brandSocialChannels.json';
import { ReactComponent as Icon } from 'src/svgs/inline/placeholder.svg';

const list = {
  facebook: <Icon />,
  pinterest: <Icon />,
  twitter: <Icon />,
  instagram: <Icon />,
};

const config = {
  displayLabel: false,
};

storiesOf('Components/BrandSocialChannels', module).add('default', () => (
  <BrandSocialChannels listIcons={list} content={content} {...config} />
));
