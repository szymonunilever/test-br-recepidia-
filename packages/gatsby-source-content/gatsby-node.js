const axios = require('axios');
const createNodes = require('./createNodes');
const {
  createPagesNodes,
  createComponentsNodes,
  createArticleNodes,
  createCategoryNodes,
  createDictionaryNodes,
  createDisclaimerNodes,
} = createNodes;
const pagesMockBr = require('./data/pages.json');
const componentsMockBr = require('./data/components.json');
const pagesMockMx = require('./data/pages-mx.json');
const componentsMockMx = require('./data/components-mx.json');
const categoriesMockMx = require('./data/categories-mx.json');

const fetchContent = (configOptions, contentType) => {
  return axios.get(
    configOptions.endpoint.replace('{contentType}', `${contentType}`),
    {
      headers: {
        'x-api-key': configOptions.key,
      },
    }
  );
};

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;

  delete configOptions.plugins;

  const [
    // pagesResponse,
    // componentsResponse,
    articlesResponse,
    categoriesResponse,
  ] = await Promise.all([
    //fetchContent(configOptions, 'pages'),
    //fetchContent(configOptions, 'components'),
    fetchContent(configOptions, 'articles'),
    configOptions.locale === 'es-mx'? new Promise(resolve => resolve({data:categoriesMockMx})) : fetchContent(configOptions, 'aem/categories'),
  ]);
  // please add to pagesData local page json mocks for development purposes if page on BE does not exist or incorrect
  // e.g. const pagesData = [...pagesResponse.data.pages, newPageMock];
  const pagesMock = configOptions.locale === 'es-mx' ? pagesMockMx : pagesMockBr;
  const componentsMock = configOptions.locale === 'es-mx' ? componentsMockMx : componentsMockBr;
  const pagesData = [...pagesMock.pages];
  //TODO: remove next string when data for components will fixed on middleware
  const componentsData = componentsMock;
  pagesData.forEach(page => {
    createPagesNodes(page, { createNodeId, createContentDigest, createNode });
  });

  //TODO: modify next two functions when data for components will be fixed on middleware.
  componentsData.components.components.items.forEach(component => {
    createComponentsNodes(component, {
      createNodeId,
      createContentDigest,
      createNode,
    });
  });
  componentsData.dictionary &&
    createDictionaryNodes(componentsData.dictionary, {
      createNodeId,
      createContentDigest,
      createNode,
    });

  componentsData.disclaimer &&
    createDisclaimerNodes(componentsData.disclaimer, {
      createNodeId,
      createContentDigest,
      createNode,
    });

  //  componentsResponse.data.components.components.items.forEach(component => {
  //   createComponentsNodes(component, {
  //     createNodeId,
  //     createContentDigest,
  //     createNode,
  //   });
  // });

  articlesResponse.data.articles.forEach(article => {
    createArticleNodes(article, {
      createNodeId,
      createContentDigest,
      createNode,
    });
  });

  categoriesResponse.data.forEach(
    item =>
      item &&
      createCategoryNodes(item, {
        createNodeId,
        createContentDigest,
        createNode,
      })
  );
};

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  const typeDefs = `
    type Category implements Node {
      id: Int!
      parentId: Int
      name: String!
      description: String
      title: String
      titlePlural: String
      seasonalPromo: [CategoryTag]
      image: CategoryImage
      recipeDetails: CategoryRecipeDetails
      inNavigation: Boolean
      inFooter: Boolean
      showOnHomePage: Int
      categoryOrder: Int
      tags: [CategoryTag]
      primaryTag: CategoryTag
    }
    
    type CategoryTag {
      id: Int!
      name: String!
    }
    type CategoryImage {
      base64: String
      aspectRatio: Float
      width: Float
      height: Float
      src: String
      srcWebp: String
      srcSet: String
      srcSetWebp: String
      sizes: String
    }
    type CategoryRecipeDetails {
      serves: String
      cookTime: String
    }    
  `;
  createTypes(typeDefs);
};
