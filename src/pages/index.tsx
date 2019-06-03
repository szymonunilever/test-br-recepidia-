import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
// @ts-ignore
import Icon from 'src/svgs/inline/plus.svg';
import Favorite from '../components/base/Favorite/Favorite';

const IndexPage = ({ data, location }: IndexPageProps) => {
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <SEO title="Recepedia Home" />
      Hello Recepedia
      <Favorite icon={<Icon />} isSelected={false} />
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
  data: any;
  location: Location;
}
