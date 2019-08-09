const parseComponents = components =>
  components.map(component => ({
    ...component,
    content: JSON.parse(component.content),
  }));

module.exports = async ({ graphql, createPage }) => {
  const result = await graphql(`
    {
      allPage {
        nodes {
          components {
            name
            content
            assets {
              url
              alt
              localImage {
                id
                childImageSharp {
                  fluid {
                    aspectRatio
                    base64
                    sizes
                    src
                    srcSet
                    srcSetWebp
                    srcWebp
                  }
                }
              }
            }
          }
          type
          relativePath
        }
      }
    }
  `);

  const pages = result.data.allPage.nodes.map(node => ({
    ...node,
    components: parseComponents(node.components),
  }));

  pages
    .filter(({ type }) =>
      [
        'Home',
        'AllRecipes',
        'Search',
        'ContactUs',
        'ContactForm',
        'UserProfile',
        'NotFound',
        'AboutUs',
        'MealPlanner',
      ].includes(type)
    )
    .forEach(node => {
      createPage(node);
    });

  return pages;
};
