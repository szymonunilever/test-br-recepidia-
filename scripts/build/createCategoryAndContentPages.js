module.exports = async ({ graphql, createPage }) => {
  const result = await graphql(`
    {
      allTag {
        edges {
          node {
            fields {
              slug
            }
            tagId
          }
        }
      }
    }
  `);

  result.data.allTag.edges.forEach(edge => {
    createPage(edge);
  });
};
