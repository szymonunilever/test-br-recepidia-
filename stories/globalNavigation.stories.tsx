import React from 'react';
import { storiesOf } from '@storybook/react';
import LogoIcon from 'src/svgs/inline/placeholder.svg';
import ArrowDownIcon from 'src/svgs/inline/arrow-down.svg';
import ButtonCloseIcon from 'src/svgs/inline/x-mark.svg';

import GlobalNavigation from 'src/components/lib/GlobalNavigation';
import list from 'src/components/data/menu.json';

import Example from '../src/components/lib/Example';

const config = {
  logo: {
    icon: <LogoIcon style={{ height: '40px' }} className="main-logo__icon" />,
    path: '/',
  },
  login: <Example text="login" />,
  dropDownIcon: <ArrowDownIcon className="dropdown-icon" />,
  buttonCloseIcon: <ButtonCloseIcon />,
  isAccordion: true,
};

const content = {
  list,
};

storiesOf('Components/GlobalNavigation', module).add('Default view', () => {
  return (
    <GlobalNavigation content={content} {...config}>
      <Example text="searchBar" />
    </GlobalNavigation>
  );
});
