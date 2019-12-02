import React from 'react';
import { storiesOf } from '@storybook/react';
import { ReactComponent as LogoIcon } from '../svgs/inline/logo.svg';
import { ReactComponent as ArrowDownIcon } from '../svgs/inline/arrow-down.svg';
import { ReactComponent as ButtonCloseIcon } from '../svgs/inline/x-mark.svg';
import { ReactComponent as SearchIcon } from '../svgs/inline/search-icon.svg';

import { GlobalNavigation } from '../index';
import list from '../mocks/globalNavigationMenu.json';

const config = {
  logo: {
    icon: <LogoIcon className="main-logo__icon" />,
    path: '/',
  },
  dropDownIcon: <ArrowDownIcon className="dropdown-icon" />,
  buttonCloseIcon: ButtonCloseIcon,
  isAccordion: true,
};

const content = {
  list,
};

storiesOf('Generic/GlobalNavigation', module).add('Default view', () => {
  return (
    <GlobalNavigation content={content} {...config}>
      <p className="global-navigation__profile">Hi Laura</p>
      <SearchIcon className="searchBar" />
    </GlobalNavigation>
  );
});
