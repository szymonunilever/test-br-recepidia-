const recursiveCallback = require('./recursiveCallback');

const parseComponents = components => {
  const contentHandler = (contentString, assets) => {
    let contentObject = JSON.parse(contentString);
    const assetsMap = {};
    assets.forEach(asset => (assetsMap[asset.url] = asset.localImage));

    return recursiveCallback(contentObject, 'image', capturedProp => {
      return {
        ...capturedProp,
        localImage: assetsMap[capturedProp.url],
      };
    });
  };
  return components.items.map(component => ({
    ...component,
    content: contentHandler(component.content, component.assets),
  }));
};
module.exports = async ({ graphql, createPage }) => {
  const result = await graphql(`
    {
      allPage {
        nodes {
          components {
            items {
              name
              content
              assets {
                url
                alt
                localImage {
                  id
                  childImageSharp {
                    fluid(maxWidth: 1088, quality: 25) {
                      base64
                      aspectRatio
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
          }
          type
          relativePath
          seo {
            title
            description
            meta {
              name
              content
            }
          }
        }
      }
    }
  `);

  const pages = result.data.allPage.nodes.map(node => ({
    ...node,
    components: {
      items: parseComponents(node.components),
    },
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
        'Sitemap',
      ].includes(type)
    )
    .forEach(pageNode => {
      createPage(pageNode);
    });

  return pages;
};
