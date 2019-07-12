import React, { ReactNode } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import GlobalFooter from 'src/components/lib/components/GlobalFooter';
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
import GeneratedForm from 'src/components/lib/components/GeneratedForm';
import { findPageComponentContent } from 'src/utils';

const Layout = ({ children, className }: LayoutProps) => {
  const { allCommonComponent } = useStaticQuery(graphql`
    {
      allCommonComponent {
        nodes {
          content
          name
        }
      }
    }
  `);

  const components = allCommonComponent.nodes;
  components.forEach((component: any) => {
    component.content =
      typeof component.content === 'string'
        ? JSON.parse(component.content)
        : component.content;
  });
  return (
    <div className={cx('global-container', className)}>
      <BackToTop content={{}} Icon={ArrowUpIcon} />
      <a className="skip-to-content" href="#content">
        Skip To Content
      </a>
      <Navigation
        navigationContent={
          findPageComponentContent(
            components,
            'GlobalNavigation'
          ) as AppContent.GlobalNavigation.Content
        }
        searchContent={
          findPageComponentContent(
            components,
            'SearchInput'
          ) as AppContent.SearchInput.Content
        }
      />
      <main id="content">{children}</main>
      <GeneratedForm
        titleLevel={1}
        shouldValidate={true}
        onSubmit={async (value: object) => {
          await new Promise(resolve => setTimeout(resolve, 500));
          // eslint-disable-next-line no-console
          console.log('Submitting sign up email', value);
        }}
        content={findPageComponentContent(components, 'Form', 'SignUpForm')}
      />
      <GlobalFooter
        logoIcon={<UnileverLogoIcon text="Unilever Logo" />}
        content={findPageComponentContent(components, 'GlobalFooter')}
      >
        <BrandSocialChannels
          content={findPageComponentContent(components, 'BrandSocialChannels')}
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
