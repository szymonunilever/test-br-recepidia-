import React from 'react';
import Search from 'src/components/Search/Search';
import GlobalFooter from 'src/components/lib/components/GlobalFooter';
import footerItemsList from 'src/components/data/globalFooterMenu.json';
import list from 'src/components/data/globalNavigationMenu.json';
import LogoIcon from 'src/svgs/inline/logo.svg';
import UnileverLogoIcon from 'src/svgs/inline/unilever-logo.svg';
import ArrowDownIcon from 'src/svgs/inline/arrow-down.svg';
import ButtonCloseIcon from 'src/svgs/inline/x-mark.svg';
import GlobalNavigation from 'src/components/lib/components/GlobalNavigation';

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className="global-container">
      <GlobalNavigation
        logo={{
          icon: (
            <LogoIcon style={{ height: '40px' }} className="main-logo__icon" />
          ),
          path: '/',
        }}
        dropDownIcon={<ArrowDownIcon className="dropdown-icon" />}
        buttonCloseIcon={ButtonCloseIcon}
        content={{ list }}
      >
        <Search />
      </GlobalNavigation>
      <main>{children}</main>
      <GlobalFooter
        logoIcon={<UnileverLogoIcon text="Unilever Logo" />}
        content={{
          list: footerItemsList,
          copyrightText: 'Unilever 2019',
        }}
      />
    </div>
  );
};

export default Layout;

interface LayoutProps {
  location?: Location;
  title?: string;
  children?: any; // eslint-disable-line
}
