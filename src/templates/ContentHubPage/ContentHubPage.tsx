import React from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import SEO from 'src/components/Seo';
import Kritique from 'integrations/Kritique';
import { findPageComponentContent, fromCamelCase, getTagSlug } from 'src/utils';
import RecipeListing, {
  RecipeListViewType,
} from 'src/components/lib/components/RecipeListing';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';
import Hero from 'src/components/lib/components/Hero';
import PageListing from 'src/components/lib/components/PageListing';
import pageListingData from 'src/components/data/pageListing.json';
import cx from 'classnames';
import theme from './ContentHubPage.module.scss';
import FavoriteIcon from '../../svgs/inline/favorite.svg';
import { PageListingViewTypes } from '../../components/lib/components/PageListing/models';
import { action } from '@storybook/addon-actions';
import TagLinks from 'src/components/TagsLinks';
import DigitalData from '../../../integrations/DigitalData';

const ContentHubPage: React.SFC<ContentHubPageProps> = ({
  data,
  pageContext,
}) => {
  const { components } = pageContext;
  const { tag, allRecipe, allTag } = data;
  const classWrapper = cx(theme.recipeCategoryPage, 'recipe-category-page');
  const recipesListingContent = findPageComponentContent(
    components,
    'RecipeListing',
    'RecipesByCategory'
  );
  const tagLabel = tag.title || fromCamelCase(tag.name);

  return (
    <Layout className={classWrapper}>
      <SEO title={`Recipe category: ${tag.title}`} />
      <DigitalData pageContext={pageContext} data={tag} />
      <Kritique />

      <section className={cx(theme.contenthubRecipes, 'bg--half')}>
        <div className="container">
          <RecipeListing
            content={{
              ...recipesListingContent,
              title: recipesListingContent.title
                .replace('{numRes}', allRecipe.nodes.length)
                .replace('{categoryName}', tagLabel),
            }}
            list={allRecipe.nodes}
            ratingProvider={RatingAndReviewsProvider.kritique}
            viewType={RecipeListViewType.Base}
            FavoriteIcon={FavoriteIcon}
            titleLevel={2}
            initialCount={8}
            recipePerLoad={4}
            withFavorite
            favorites={[]}
            onFavoriteChange={action('favorites were changed')}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <TagLinks
            list={allTag.nodes}
            content={findPageComponentContent(components, 'Tags')}
          />
        </div>
      </section>

      <section className="_pb--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className="hero--planner color--inverted"
        />
      </section>

      <section className="_pb--40 _pt--40">
        <div className="container">
          <PageListing
            content={findPageComponentContent(
              components,
              'PageListing',
              'RecipeCategories'
            )}
            viewType={PageListingViewTypes.carousel}
            list={pageListingData}
            initialCount={6}
          />
        </div>
      </section>
    </Layout>
  );
};

export default ContentHubPage;

export const query = graphql`
  query($slug: String!, $id: Int) {
    tag(fields: { slug: { eq: $slug } }) {
      name
      tagId
    }

    allRecipe(
      filter: {
        tagGroups: { elemMatch: { tags: { elemMatch: { id: { eq: $id } } } } }
      }
    ) {
      nodes {
        ...RecipeFields
      }
    }

    allTag {
      nodes {
        ...TagFields
      }
    }
  }
`;

interface ContentHubPageProps {
  data: {
    tag: {
      name: string;
      description: string;
      title: string;
      tagId: string;
      assets: {
        localImage: Internal.LocalImage;
      }[];
    };
    allRecipe: {
      nodes: Internal.Recipe[];
    };
    allTag: {
      nodes: Internal.Tag[];
    };
  };
  pageContext: {
    title: string;
    components: {
      [key: string]: string | number | boolean | object | null;
    }[];
  };
}
