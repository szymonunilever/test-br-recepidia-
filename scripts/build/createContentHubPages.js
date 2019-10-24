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
            title
          }
        }
      }
    }
  `);

  result.data.allTag.edges.forEach(edge => {
    createPage(edge);
  });
};
