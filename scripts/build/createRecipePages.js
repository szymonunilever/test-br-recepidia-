module.exports = async ({ graphql, createPage }) => {
  const result = await graphql(`
    {
      allRecipe {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allRecipe.edges.forEach(edge => {
    createPage(edge);
  });
};
