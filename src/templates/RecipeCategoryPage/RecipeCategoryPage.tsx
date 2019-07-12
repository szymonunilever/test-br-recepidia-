import React from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import SEO from 'src/components/Seo/Seo';
import Kritique from 'integrations/Kritique';
import { TagName, Text } from 'src/components/lib/components/Text';
import { findPageComponentContent } from 'src/utils';
import RecipeListing, {
  RecipeListViewType,
} from 'src/components/lib/components/RecipeListing';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';
import Hero from 'src/components/lib/components/Hero';
import { Tags } from 'src/components/lib/components/Tags';
import PageListing from 'src/components/lib/components/PageListing';
import pageListingData from 'src/components/data/pageListing.json';
import cx from 'classnames';
import theme from '../RecipeCategoryPage/RecipeCategoryPage.module.scss';
import FavoriteIcon from '../../svgs/inline/favorite.svg';
import { PageListingViewTypes } from '../../components/lib/components/PageListing/models';
import { action } from '@storybook/addon-actions';
import AdaptiveImage from '../../components/lib/components/AdaptiveImage';

const RecipeCategotyPage = ({ data, pageContext }: RecipeCategotyPageProps) => {
  const { components } = pageContext;
  const { tag, allRecipe, allTag } = data;
  const categoryImage = get(tag.assets, '[0].localImage');
  const classWrapper = cx(theme.recipeCategoryPage, 'recipe-category-page');
  const recipesListingContent = findPageComponentContent(
    components,
    'RecipeListing',
    'RecipesByCategory'
  );

  return (
    <Layout className={classWrapper}>
      <SEO title={`Recipe category: ${tag.title}`} />
      <Kritique />
      <section className="_pt--40">
        <div className="container">
          <Text
            tag={TagName['h1']}
            text={tag.title || 'Recipe Category Name'}
          />
        </div>
      </section>
      <section>
        <div className="container">
          <Text
            tag={TagName['p']}
            text={
              tag.description ||
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid asperiores atque dolores exercitationem harum, incidunt libero, nesciunt, omnis perferendis placeat possimus praesentium provident quae quia quibusdam rem sequi ut veniam!\n'
            }
          />
        </div>
      </section>

      {categoryImage && (
        <section className={theme.heroBg}>
          <div className="container">
            <AdaptiveImage localImage={categoryImage} alt={tag.title} />
          </div>
        </section>
      )}

      <section className={theme.greyBg}>
        <div className="container">
          <RecipeListing
            content={{
              ...recipesListingContent,
              title: recipesListingContent.title.replace(
                '{numRes}',
                allRecipe.nodes.length
              ),
            }}
            list={allRecipe.nodes}
            ratingProvider={RatingAndReviewsProvider.kritique}
            viewType={RecipeListViewType.Base}
            FavoriteIcon={FavoriteIcon}
            titleLevel={3}
            initialCount={6}
            recipePerLoad={4}
            withFavorite
            favorites={[]}
            onFavoriteChange={action('favorites were changed')}
          />
        </div>
      </section>

      <section>
        <div className="container">
          <Tags
            list={allTag.nodes}
            content={findPageComponentContent(components, 'Tags')}
            initialCount={8}
            tagsPerLoad={4}
            variant="link"
          />
        </div>
      </section>

      <section className="_pb--40">
        <Hero
          content={findPageComponentContent(components, 'Hero')}
          viewType="Image"
          className={'hero--planner color--inverted'}
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

export default RecipeCategotyPage;

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

// export const query = graphql`
//   query($slug: String!, $id: Int!) {
//     tag(fields: { slug: { eq: $slug } }) {
//       name
//       description
//       title
//       tagId
//       assets {
//         url
//         alt
//         localImage {
//           childImageSharp {
//             fluid(maxWidth: 1200) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//       }
//     }

//     allRecipe(
//       filter: {
//         tagGroups: { elemMatch: { tags: { elemMatch: { id: { eq: $id } } } } }
//       }
//     ) {
//       nodes {
//         ...RecipeFields
//       }
//     }

//     allTag {
//       nodes {
//         ...TagFields
//       }
//     }
//   }
// `;

interface RecipeCategotyPageProps {
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
