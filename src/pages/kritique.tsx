import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
import '../scss/main.scss';
import { RecipeListing } from 'src/components/lib/RecipeListing';
import dataSource from 'src/components/data/recipes.json';
import keys from '../../integrationsKeys.json';
const listing = dataSource.data.allRecipe.edges.map(item => item.node);

const KritiquePage = ({ location }: IndexPageProps) => {
  const kritiqueWidjetSrc = `https://eu.kritique.io/widget/resources/js/RR_widget.js?brandid=${
    keys.kritique.brandId
  }&localeid=${keys.kritique.localeId}&apikey=${
    keys.kritique.apiKey
  }&siteSource=${keys.kritique.siteSource}`;

  return (
    <Layout location={location} title={'smth'}>
      <SEO title="Kritique integration">
        <script
          src="https://code.jquery.com/jquery-3.4.1.min.js"
          integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
          crossOrigin="anonymous"
        />
        <script
          type="text/javascript"
          async
          id="rr-widget"
          src={kritiqueWidjetSrc}
        />
        <script
          type="text/javascript"
          async
          src="/config/RR_widget_config.js"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="//eu.kritique.io/widget/resources/css/RR_widget.css"
        />
      </SEO>
      <RecipeListing list={listing} content={{ title: 'Recipes' }} />
    </Layout>
  );
};

export default KritiquePage;

interface IndexPageProps {
  data: any;
  location: Location;
}
