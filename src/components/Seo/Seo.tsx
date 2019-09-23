/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { ReactNode } from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import truncate from 'lodash/truncate';

function SEO({
  description,
  lang,
  meta = [],
  link = [],
  title,
  canonical,
  children,
}: SeoProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = truncate(
    (description || site.siteMetadata.description)
      .replace(/<*.\/?>/, '')
      .replace(/<\/*.>/, ''),
    { length: 150 }
  );

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      link={[
        {
          rel: `canonical`,
          href: canonical,
        },
      ].concat(link)}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      {children}
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

interface SeoProps {
  description: string;
  lang: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any;
  link?: any;
  title?: string;
  children?: ReactNode | ReactNode[];
  canonical?: string;
}

export default SEO;
