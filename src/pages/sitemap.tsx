import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo';
import { Sitemap } from 'src/components/lib/components/Sitemap';
import { SitemapCategoryEntry } from 'src/components/lib/components/Sitemap/partials';
import { getSitemapFromPaths } from 'src/utils/getSitemapFromPaths';

const SitemapPage = () => {
  const data: SipeMapPageData = useStaticQuery(graphql`
    {
      allSitePage {
        edges {
          node {
            path
          }
        }
      }
    }
  `);

  const sitemap: SitemapCategoryEntry[] = getSitemapFromPaths(
    data.allSitePage.edges.map(({ node }) => node.path)
  );

  return (
    <Layout>
      <SEO title="Sitemap" />
      <section>
        <div className="container">
          <Sitemap content={sitemap} />
        </div>
      </section>
    </Layout>
  );
};

interface SipeMapPageData {
  allSitePage: {
    edges: {
      node: {
        path: string;
      };
    }[];
  };
}

export default SitemapPage;
