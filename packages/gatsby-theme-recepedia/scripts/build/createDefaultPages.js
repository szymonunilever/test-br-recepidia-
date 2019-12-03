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
                  ext
                  childImageSharp {
                    fluid(
                      srcSetBreakpoints: [
                        200
                        300
                        400
                        500
                        600
                        800
                        1200
                        1600
                      ]
                    ) {
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
          title
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

  let pagesTypes = [
    'Home',
    'AllRecipes',
    'Search',
    'ContactUs',
    'ContactForm',
    'ContactUsThankYou',
    'UserProfile',
    'NotFound',
    'AboutUs',
    'MealPlanner',
    'Sitemap',
    'NewsletterSignUp',
    'PreferenceCenter',
    'TermsAndConditions',
    //'FAQ',
  ];

  pagesTypes.push(
    'BrandPromisePage',
    'BrandProductsPage'
    // 'BrandProductDetailsPage'
  );

  pages
    .filter(({ type }) => pagesTypes.includes(type))
    .forEach(pageNode => {
      createPage(pageNode);
    });

  return pages;
};
