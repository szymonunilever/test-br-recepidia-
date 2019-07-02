import React, { ReactNode } from 'react';
import GlobalFooter from 'src/components/lib/components/GlobalFooter';
import footerContent from 'src/components/data/globalFooterMenu.json';
import UnileverLogoIcon from 'src/svgs/inline/unilever-logo.svg';
import 'src/scss/main.scss';
import BackToTop from '../lib/components/BackToTop/BackToTop';
import Icon from 'src/svgs/inline/arrow-up.svg';
import Navigation from '../Navigation/Navigation';

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={'global-container ' + className}>
      <BackToTop content={{}} Icon={Icon} />
      <a className="skip-to-content" href="#content">
        Skip To Content
      </a>
      <Navigation />
      <main id="content">{children}</main>
      <GlobalFooter
        logoIcon={<UnileverLogoIcon text="Unilever Logo" />}
        content={footerContent}
      />
    </div>
  );
};

export default Layout;

interface LayoutProps {
  location?: Location;
  title?: string;
  children?: ReactNode | ReactNode[];
  className?: string;
}
