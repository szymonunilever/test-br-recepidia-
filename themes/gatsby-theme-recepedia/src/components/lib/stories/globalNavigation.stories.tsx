import React from 'react';
import { storiesOf } from '@storybook/react';
import { ReactComponent as LogoIcon } from './svgs/inline/logo.svg';
import { ReactComponent as ArrowDownIcon } from './svgs/inline/arrow-down.svg';
import { ReactComponent as ButtonCloseIcon } from './svgs/inline/x-mark.svg';
import { ReactComponent as SearchIcon } from './svgs/inline/search-icon.svg';

import { Example, GlobalNavigation } from '../index';
import list from './mocks/globalNavigationMenu.json';

const config = {
  logo: {
    icon: <LogoIcon className="main-logo__icon" />,
    path: '/',
  },
  login: <Example className="login" text="Login to your account" />,
  dropDownIcon: <ArrowDownIcon className="dropdown-icon" />,
  buttonCloseIcon: ButtonCloseIcon,
  isAccordion: true,
};

const content = {
  list,
};

storiesOf('Components/GlobalNavigation', module).add('Default view', () => {
  return (
    <GlobalNavigation content={content} {...config}>
      <Example className="signUpBtn" text="Sign up!" />
      <Example className="login-user" text="Hi Laura" />
      <SearchIcon className="searchBar" />
    </GlobalNavigation>
  );
});
