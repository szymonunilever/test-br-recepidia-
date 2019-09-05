const path = require('path');

module.exports = async ({ graphql, createPage, page }) => {
  //TODO: when we will have any other fields in recipeDetails we should modify query.
  const result = await graphql(`
    {
      allCategory {
        nodes {
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
          description
          tags {
            id
            name
          }
          localImage {
            childImageSharp {
              fluid(maxWidth: 1088, cropFocus: CENTER) {
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
        }
      }
    }
  `);

  const component = path.resolve(
    `./src/templates/RecipeCategoryPage/RecipeCategoryPage.tsx`
  );

  const categories = result.data.allCategory.nodes.filter(
    item => (item.tags && item.tags.length > 0) || item.recipeDetails
  );
  categories &&
    categories.forEach(node => {
      const tags = node.tags ? node.tags.map(tag => tag.id) : [];
      const { recipeDetails } = node;
      createPage({
        path: node.fields.slug,
        component,
        context: {
          slug: node.fields.slug,
          page,
          tags,
          recipeDetails,
          category: node,
        },
      });
    });
};
