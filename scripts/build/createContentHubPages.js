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
            name
          }
        }
      }
    }
  `);

  result.data.allTag.edges.forEach(edge => {
    createPage(edge);
  });
};
