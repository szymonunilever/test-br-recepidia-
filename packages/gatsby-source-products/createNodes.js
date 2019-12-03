exports.createPagesNodes = (
  page,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`page-product-${page.id}`);

  const nodeContent = JSON.stringify(page);
  const nodeData = Object.assign({}, page, {
    id: nodeId,
    productId: page.id,
    parent: null,
    children: [],
    internal: {
      type: 'Product',
      content: nodeContent,
      contentDigest: createContentDigest(page),
    },
  });

  createNode(nodeData);
  return nodeData;
};
