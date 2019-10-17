import React from 'react';
import { storiesOf } from '@storybook/react';
import { ReactComponent as LogoIcon } from './svgs/inline/unilever-logo.svg';

import { Example, GlobalFooter } from '../index';
import content from './mocks/globalFooterMenu.json';

const config = {
  logoIcon: <LogoIcon text="Unilever Logo" />,
};

storiesOf('Components/GlobalFooter', module).add('Default view', () => {
  return (
    <GlobalFooter content={content} {...config}>
      <Example
        className={'global-footer__languages'}
        text="language selector"
      />
      <Example className={'global-footer__social-icons'} text="social icons" />
    </GlobalFooter>
  );
});
