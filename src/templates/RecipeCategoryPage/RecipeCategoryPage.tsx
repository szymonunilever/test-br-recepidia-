import React from 'react';
import Layout from '../../components/Layout/Layout';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import SEO from 'src/components/Seo/Seo';
import Kritique from 'integrations/Kritique';
import { TagName, Text } from 'src/components/lib/components/Text';
import { findPageComponentContent } from 'src/utils';
import RecipeListing from 'src/components/lib/components/RecipeListing';
import Hero from 'src/components/lib/components/Hero';
import RichText from 'src/components/lib/components/RichText';
import { Tags } from 'src/components/lib/components/Tags';
import PageListing from 'src/components/lib/components/PageListing';
import pageListingData from 'src/components/data/pageListing.json';
import { RatingAndReviewsProvider } from 'src/components/lib/models/ratings&reviews';

const RecipeCategotyPage = ({ data, pageContext }: RecipeCategotyPageProps) => {
  const { components } = pageContext;
  const { tag, allRecipe, allTag } = data;
  const categoryImage = get(tag.assets, '[0].localImage');
  const recipesListingContent = findPageComponentContent(
    components,
    'RecipeListing',
    'RecipesByCategory'
  );

  return (
    <Layout>
      <SEO title={`Recipe category: ${tag.title}`} />
      <Kritique />
      <section>
        <div className="container">
          <Text
            tag={TagName['h1']}
            text={tag.title || 'Recipe Category Name'}
          />
        </div>
      </section>

      <section>
        <div className="container">
          {/* <RichText content={{ html: tag.description }} /> */}
          <RichText content={{ html: 'Some tag description' }} />
        </div>
      </section>

      {categoryImage && (
        <section>
          <div className="container">
            <Hero
              content={{
                image: { localImage: categoryImage, alt: tag.title, url: '' },
              }}
              viewType="Image"
              className="hero--planner color--inverted"
            />
          </div>
        </section>
      )}

      <section>
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
            titleLevel={3}
            initialCount={6}
            recipePerLoad={4}
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

      <section>
        <Hero
          content={{
            ...findPageComponentContent(components, 'Hero'),
            header: 'Try our Meal Planner',
            longSubheader:
              "We will collect your preferences and customize a weekly menu so you don't even have to think.",
          }}
          viewType="Image"
          className="hero--planner color--inverted"
        />
      </section>

      <section>
        <div className="container">
          <PageListing
            content={findPageComponentContent(
              components,
              'PageListing',
              'RecipeCategories'
            )}
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
