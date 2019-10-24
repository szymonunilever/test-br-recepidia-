import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import { Sitemap, TagName, Text } from 'src/components/lib';
import { SitemapCategoryEntry } from 'src/components/lib/components/Sitemap/partials';
import {
  getSitemapFromPaths,
  SiteMapRawData,
} from 'src/utils/getSitemapFromPaths';
import DigitalData from '../../../integrations/DigitalData';
import { WindowLocation } from '@reach/router';
import { findPageComponentContent } from 'src/utils';
// Component Styles
import '../../scss/pages/_sitemap.scss';

const SitemapPage = ({
  pageContext: {
    page: { components, seo, type },
  },
  location,
}: SitemapPageProps) => {
  const data: SipeMapPageData = useStaticQuery(graphql`
    {
      allSitePage {
        nodes {
          path
          context {
            title
            page {
              type
            }
          }
        }
      }
    }
  `);

  const sitemap: SitemapCategoryEntry[] = getSitemapFromPaths(
    data.allSitePage.nodes
  );

  return (
    <Layout>
      <SEO {...seo} canonical={location.href} />
      <DigitalData title={seo.title} type={type} />
      <section className="_pt--40 wrapper">
        <Text
          tag={TagName['h1']}
          text={findPageComponentContent(components, 'Text', 'Title').text}
        />
      </section>
      <section className="wrapper _pt--40 _pb--40">
        <Sitemap content={sitemap} wrapBlocks={true} />
      </section>
    </Layout>
  );
};

interface SipeMapPageData {
  allSitePage: {
    nodes: SiteMapRawData[];
  };
}

interface SitemapPageProps {
  pageContext: {
    page: AppContent.Page;
  };
  location: WindowLocation;
}
export default SitemapPage;
