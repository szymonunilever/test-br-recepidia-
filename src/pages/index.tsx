import { graphql } from 'gatsby';
import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
import '../scss/main.scss';

const IndexPage = ({ data, location }: IndexPageProps) => {
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title="Recepedia Home" />
      Hello Recepedia
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

interface IndexPageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  location: Location;
}
