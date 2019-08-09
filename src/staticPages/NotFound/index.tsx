import React from 'react';
import { graphql, Link } from 'gatsby';

import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import { Text, TagName } from 'src/components/lib/components/Text';
import AdaptiveImage from 'src/components/lib/components/AdaptiveImage';
import Button from 'src/components/lib/components/Button';
import DigitalData from 'integrations/DigitalData';
import { findPageComponentContent } from 'src/utils';

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
      <Text
        tag={TagName.h1}
        text={findPageComponentContent(components, 'Text', 'Title').text}
      />
      <Text
        tag={TagName.p}
        text={findPageComponentContent(components, 'Text', 'Subtitle').text}
      />
      <AdaptiveImage
        className="not-found__image"
        {...findPageComponentContent(components, 'AdaptiveImage').image}
      />
      <Button className="not-found__recipes-link">
        <Link to={'/recipes'}>
          {findPageComponentContent(components, 'Button').label}
        </Link>
      </Button>
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
