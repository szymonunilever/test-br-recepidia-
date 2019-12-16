const path = require('path');
const isEmpty = require('lodash').isEmpty;
const isNull = require('lodash').isNull;
const omitBy = require('lodash').omitBy;

module.exports = async ({ graphql, createPage, page, landingPage }) => {
  //TODO: when we will have any other fields in recipeDetails we should modify query.
  const result = await graphql(`
    {
      allCategory {
        nodes {
          primaryTag {
            id
            name
          }
          inNavigation
          fields {
            slug
          }
          recipeDetails {
            serves
            cookTime
          }
          inNavigation
          inFooter
          id
          name
          title
          titlePlural
          seasonalPromo {
            id
            name
          }
          description
          tags {
            id
            name
          }
          localImage {
            childImageSharp {
              fluid {
                base64
                aspectRatio
                src
                srcWebp
                srcSet
                srcSetWebp
                sizes
              }
            }
          }
          children {
            ... on Category {
              categoryId
            }
          }
        }
      }
    }
  `);

  const component = path.resolve(
    `./src/templates/RecipeCategoryPage/RecipeCategoryPage.tsx`
  );

  const componentLanding = path.resolve(
    `./src/templates/CategoryLandingPage/CategoryLandingPage.tsx`
  );

  const categories = result.data.allCategory.nodes.filter(
    item =>
      isEmpty(item.children) &&
      (!isEmpty(item.tags) || !isEmpty(omitBy(item.recipeDetails, isNull)))
  );
  const categoriesLanding = result.data.allCategory.nodes.filter(
    item => !isEmpty(item.children)
  );

  categories &&
    categories.forEach(node => {
      const tags = node.tags ? node.tags.map(tag => tag.id) : [];
      const { recipeDetails } = node;
      createPage({
        path: node.fields.slug,
        component,
        context: {
          title: node.title,
          slug: node.fields.slug,
          page,
          tags,
          recipeDetails,
          category: node,
        },
      });
    });

  categoriesLanding &&
    categoriesLanding.forEach(node => {
      const tags = node.tags ? node.tags.map(tag => tag.id) : [];
      const seasonalPromo = node.seasonalPromo
        ? node.seasonalPromo.map(tag => tag.id)
        : [];
      const children = node.children
        ? node.children.map(child => child.categoryId)
        : [];
      const { recipeDetails } = node;
      createPage({
        path: node.fields.slug,
        component: componentLanding,
        context: {
          title: node.title,
          slug: node.fields.slug,
          page: landingPage,
          children,
          seasonalPromo,
          tags,
          recipeDetails,
          category: node,
        },
      });
    });
};
