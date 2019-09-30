import React, { ReactNode, useEffect } from 'react';
import { useStaticQuery, graphql, navigate } from 'gatsby';
import GlobalFooter from 'src/components/lib/components/GlobalFooter';
import UnileverLogoIcon from 'src/svgs/inline/unilever-logo.svg';
import BackToTop from '../lib/components/BackToTop/BackToTop';
import { ReactComponent as ArrowUpIcon } from 'src/svgs/inline/arrow-up.svg';
import { ReactComponent as FacebookIcon } from 'src/svgs/inline/facebook.svg';
import { ReactComponent as InstagramIcon } from 'src/svgs/inline/instagram.svg';
import Navigation from '../Navigation/Navigation';
import cx from 'classnames';
import BrandSocialChannels from 'src/components/lib/components/BrandSocialChannels';
import GeneratedForm from 'src/components/lib/components/GeneratedForm';
import { findPageComponentContent } from 'src/utils';
import smartOutline from 'smart-outline';
// // Component Styles
// import '../../scss/pages/_layout.scss';

import find from 'lodash/find';

const Layout = ({
  children,
  className,
  showNewsletterForm = true,
}: LayoutProps) => {
  const { allCommonComponent, allCategory } = useStaticQuery(graphql`
    {
      allCommonComponent {
        nodes {
          content
          name
        }
      }
      allCategory(filter: { inFooter: { eq: true } }) {
        nodes {
          title
          inFooter
          fields {
            slug
          }
        }
      }
    }
  `);

  useEffect(() => {
    smartOutline.init();
  }, []);
  const componentNodes = allCommonComponent.nodes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentNodes.forEach((component: any) => {
    component.content =
      typeof component.content === 'string'
        ? JSON.parse(component.content)
        : component.content;
  });
  const components = { items: componentNodes };

  const footerCategoryLinks: AppContent.GlobalFooter.MenuItem[] = allCategory.nodes.map(
    (category: Partial<Internal.Category>) => ({
      path: category.fields && category.fields.slug,
      name: category.title,
    })
  );

  const footerNavLists: AppContent.GlobalFooter.Content = findPageComponentContent(
    components,
    'GlobalFooter'
  );
  const footerCategoryList: AppContent.GlobalFooter.MenuList = {
    items: footerCategoryLinks,
  };

  const categoryLinksInFooter = find(footerNavLists.lists, footerCategoryList);

  if (!categoryLinksInFooter) {
    footerNavLists.lists.unshift(footerCategoryList);
  }

  // eslint-disable-next-line no-console
  const onSignUpCallback = () => {
    navigate('/inscrever');
  };

  // @ts-ignore
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
        profileContent={
          findPageComponentContent(
            components,
            'Profile'
          ) as AppContent.ProfileHeader.Content
        }
      />
      <main id="content">{children}</main>
      {showNewsletterForm && (
        <GeneratedForm
          shouldValidate={false}
          onSubmit={onSignUpCallback}
          recaptchaAction="SignUpEmail"
          content={findPageComponentContent(components, 'Form', 'SignUpForm')}
          className="general-signup"
        />
      )}
      <GlobalFooter logoIcon={<UnileverLogoIcon />} content={footerNavLists}>
        <BrandSocialChannels
          content={findPageComponentContent(components, 'BrandSocialChannels')}
          listIcons={{
            facebook: <FacebookIcon />,
            instagram: <InstagramIcon />,
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
  showNewsletterForm?: boolean;
}
