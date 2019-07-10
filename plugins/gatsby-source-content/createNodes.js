const processComponent = component => {
  const assets = component.content.image ? [component.content.image] : [];

  return {
    name: component.name,
    content: JSON.stringify(component.content),
    assets,
  };
};

exports.createPagesNodes = (
  page,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`page-${page.type}`);
  page.components = page.components.items.map(processComponent);
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

exports.createComponentsNodes = (
  component,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`component-${component.type}`);
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