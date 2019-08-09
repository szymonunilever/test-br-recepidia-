const path = require('path');

const RecipeFields = `
    description
    fields {
      slug
    }
    id
    ingredients {
      description
      measurementUnit
      multiple
      originalProductId
      productId
      quantity
    }
    methods {
      description
      position
    }
    recipeDetails {
      preperationTime
      serves
      totalTime
      cookTime
    }
    recipeId
    tagGroups {
      label
      name
      tags {
        id
        name
      }
    }
    title
    nutrients {
      description
      displayUnit
      dv
      epercent
      isCore
      name
      position
      rawRiPercent
      rawDvPercent
      rawValue
      ri
      unit
      value
    }
    nutrientsPerServing {
      description
      displayUnit
      dv
      epercent
      isCore
      name
      position
      rawRiPercent
      rawDvPercent
      rawValue
      ri
      unit
      value
    }
    localImage {
      childImageSharp {
        fluid {
          base64
          aspectRatio
          width
          height
          src
          srcWebp
          srcSet
          srcSetWebp
          sizes
          url
          title
        }
      }
    }
`;

const component = path.resolve(`./src/templates/RecipePage/RecipePage.tsx`);

module.exports = async ({ graphql, createPage, page }) => {
  const result = await graphql(`
    {
      allRecipe {
        nodes {
          ${RecipeFields}
        }
      }
    }
  `);

  result.data.allRecipe.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component,
      context: {
        page,
        recipe: node,
      },
    });
  });
};
