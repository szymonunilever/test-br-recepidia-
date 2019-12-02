import React from 'react';
import { storiesOf } from '@storybook/react';
import { ReactComponent as LogoIcon } from 'src/svgs/inline/unilever-logo.svg';

import { GlobalFooter } from '../index';
import content from '../mocks/globalFooterMenu.json';

const config = {
  logoIcon: <LogoIcon text="Unilever Logo" />,
};

storiesOf('Generic/GlobalFooter', module).add('Default view', () => {
  return (
    <GlobalFooter content={content} {...config}>
      <p>language selector</p>
      <p>social icons</p>
    </GlobalFooter>
  );
});
