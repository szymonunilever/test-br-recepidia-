module.exports = async ({ graphql, createPage }) => {
  const result = await graphql(`
    {
      allArticle {
        edges {
          node {
            fields {
              slug
            }
          }
          next {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allArticle.edges.forEach(edge => {
    createPage(edge);
  });
};
