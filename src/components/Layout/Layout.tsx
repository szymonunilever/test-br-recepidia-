import React, { ReactNode } from 'react';
import GlobalFooter from 'src/components/lib/components/GlobalFooter';
import footerContent from 'src/components/data/globalFooterMenu.json';
import UnileverLogoIcon from 'src/svgs/inline/unilever-logo.svg';
import 'src/scss/main.scss';
import BackToTop from '../lib/components/BackToTop/BackToTop';
import ArrowUpIcon from 'src/svgs/inline/arrow-up.svg';
import FacebookIcon from 'src/svgs/inline/facebook.svg';
import PinterestIcon from 'src/svgs/inline/pinterest.svg';
import InstagramIcon from 'src/svgs/inline/instagram.svg';
import TwitterIcon from 'src/svgs/inline/twitter.svg';
import Navigation from '../Navigation/Navigation';
import cx from 'classnames';
import BrandSocialChannels from 'src/components/lib/components/BrandSocialChannels';
import brandSocialChannelsContent from 'src/components/data/brandSocialChannels.json';
import { CountrySelector } from 'src/components/lib/components/CountrySelector';
import countriesList from 'src/components/data/countrySelector.json';
import GeneratedForm from 'src/components/lib/components/GeneratedForm';
import signUpFormContent from 'src/components/data/signUpFormContent.json';

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className={cx('global-container', className)}>
      <BackToTop content={{}} Icon={ArrowUpIcon} />
      <a className="skip-to-content" href="#content">
        Skip To Content
      </a>
      <Navigation />
      <main id="content">{children}</main>
      <GeneratedForm
        titleLevel={1}
        shouldValidate={true}
        onSubmit={async (value: object) => {
          await new Promise(resolve => setTimeout(resolve, 500));
          // eslint-disable-next-line no-console
          console.log('Submitting sign up email', value);
        }}
        content={signUpFormContent as AppContent.GeneratedForm.Content}
      />
      <GlobalFooter
        logoIcon={<UnileverLogoIcon text="Unilever Logo" />}
        content={footerContent}
      >
        <BrandSocialChannels
          content={brandSocialChannelsContent}
          listIcons={{
            facebook: <FacebookIcon />,
            instagram: <InstagramIcon />,
            twitter: <TwitterIcon />,
            pinterest: <PinterestIcon />,
          }}
        />
      </GlobalFooter>
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
