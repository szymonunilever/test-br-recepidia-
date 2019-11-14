import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import { Text, TagName } from 'src/components/lib';
import DigitalData from 'integrations/DigitalData';
import { findPageComponentContent } from 'src/utils';
import '../../scss/pages/_notFound.scss';
import theme from './NotFound.module.scss';
import cx from 'classnames';

const NotFoundPage = ({ data, location, pageContext }: NotFoundPageProps) => {
  const {
    page: { seo, components, type },
  } = pageContext;
  return (
    <Layout
      className="not-found"
      location={location}
      title={data.site.siteMetadata.title}
    >
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      <div className={theme.notFound}>
        <Text
          className={theme.notFound__title}
          tag={TagName.h1}
          text={findPageComponentContent(components, 'Text', 'Title').text}
        />
        <Text
          className={theme.notFound__subtitle}
          tag={TagName.p}
          text={findPageComponentContent(components, 'Text', 'Subtitle').text}
        />
        <Link
          to={'/receita'}
          className={cx('button', theme.notFound__recipesLink)}
        >
          {findPageComponentContent(components, 'Button').label}
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

interface NotFoundPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  location: Location;
  pageContext: {
    page: AppContent.Page;
  };
}
