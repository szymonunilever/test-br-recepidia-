import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoIcon from 'src/svgs/inline/placeholder.svg';

import GlobalFooter from 'src/components/lib/components/GlobalFooter';
import list from 'src/components/data/globalFooterMenu.json';

import Example from 'src/components/lib/components/Example';

const config = {
  logoIcon: <LogoIcon text="Unilever Logo" />,
};

const content = {
  list,
  copyrightText: 'Unilever 2019',
};

storiesOf('Components/GlobalFooter', module).add('Default view', () => {
  return (
    <GlobalFooter content={content} {...config}>
      <Example text="language selector" />
      <Example text="social icons" />
    </GlobalFooter>
  );
});
