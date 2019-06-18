import React from 'react';
import Layout from 'src/components/Layout/Layout';
import SEO from 'src/components/Seo/Seo';
import '../scss/main.scss';
import { RecipeListing } from 'src/components/lib/RecipeListing';
import Kritique from '../integrations/Kritique';
import dataSource from 'src/components/data/recipes.json';
import { RatingProvider } from 'src/components/lib/Rating';

const listing = dataSource.data.allRecipe.edges.map(item => item.node);

const KritiqueTestPage = ({ location }: KritiqueTestPageProps) => {
  return (
    <Layout location={location} title={'smth'}>
      <SEO title="Kritique integration" />
      <Kritique />
      <RecipeListing
        list={listing}
        content={{ title: 'Recipes' }}
        ratingProvider={RatingProvider.kritique}
      />
    </Layout>
  );
};

export default KritiqueTestPage;

interface KritiqueTestPageProps {
  location: Location;
}
