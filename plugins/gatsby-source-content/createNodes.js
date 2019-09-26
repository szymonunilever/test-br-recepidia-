const recursiveCallback = require('../../scripts/build/recursiveCallback');
const processComponent = component => {
  const assets = [];

  recursiveCallback(component.content, 'image', capturedProp => {
    assets.push({ ...capturedProp });

    return { ...capturedProp };
  });

  return {
    name: component.name,
    content: JSON.stringify(component.content),
    assets,
  };
};

exports.createDictionaryNodes = (
  dictionary,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`dictionary`);
  const nodeContent = JSON.stringify({
    content: JSON.stringify(dictionary),
  });
  const nodeData = Object.assign(
    {},
    { content: JSON.stringify(dictionary) },
    {
      id: nodeId,
      internal: {
        type: 'Dictionary',
        content: nodeContent,
        contentDigest: createContentDigest({
          content: JSON.stringify(dictionary),
        }),
      },
    }
  );
  createNode(nodeData);
  return nodeData;
};

exports.createDisclaimerNodes = (
  disclaimer,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`disclaimer`);
  const nodeContent = JSON.stringify({
    content: JSON.stringify(disclaimer),
  });
  const nodeData = Object.assign(
    {},
    { content: JSON.stringify(disclaimer) },
    {
      id: nodeId,
      internal: {
        type: 'Disclaimer',
        content: nodeContent,
        contentDigest: createContentDigest({
          content: JSON.stringify(disclaimer),
        }),
      },
    }
  );
  createNode(nodeData);
  return nodeData;
};

exports.createPagesNodes = (
  page,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`page-${page.type}`);
  page.components.items = page.components.items.map(processComponent);
  const nodeContent = JSON.stringify(page);
  const nodeData = Object.assign({}, page, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: 'Page',
      content: nodeContent,
      contentDigest: createContentDigest(page),
    },
  });

  createNode(nodeData);
  return nodeData;
};

exports.createArticleNodes = (
  article,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`article-${article.title}`);
  const nodeContent = JSON.stringify(article);
  const nodeData = Object.assign({}, article, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: 'Article',
      content: nodeContent,
      contentDigest: createContentDigest(article),
    },
  });

  createNode(nodeData);
  return nodeData;
};

exports.createComponentsNodes = (
  component,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`component-${component.name}`);
  const processedComponent = processComponent(component);
  const nodeContent = JSON.stringify(processedComponent);
  const nodeData = Object.assign({}, processedComponent, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: 'CommonComponent',
      content: nodeContent,
      contentDigest: createContentDigest(processedComponent),
    },
  });

  createNode(nodeData);
  return nodeData;
};

const createCategoryNodes = (
  category,
  { createNodeId, createContentDigest, createNode },
  parentNodeId = null
) => {
  const nodeId = createNodeId(`category-${category.name}`);
  const { categories } = category;
  const nodeContent = JSON.stringify(category);

  createNode({
    ...category,
    id: nodeId,
    categoryId: category.id,
    parent: parentNodeId,
    children: categories
      ? categories.map(category =>
          createCategoryNodes(
            category,
            {
              createNodeId,
              createContentDigest,
              createNode,
            },
            nodeId
          )
        )
      : [],
    internal: {
      type: 'Category',
      content: nodeContent,
      contentDigest: createContentDigest(category),
    },
  });
  return nodeId;
};

exports.createCategoryNodes = createCategoryNodes;
