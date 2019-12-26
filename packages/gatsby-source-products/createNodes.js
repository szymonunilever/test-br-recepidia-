exports.createPagesNodes = (
  page,
  { createNodeId, createContentDigest, createNode }
) => {
  page.nutritionFacts = JSON.stringify(page.nutritionFacts);
  const nodeId = createNodeId(`page-product-${page.id}`);
  const nodeContent = JSON.stringify(page);
  const nodeData = Object.assign({}, page, {
    id: nodeId,
    brand: page.brand,
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
