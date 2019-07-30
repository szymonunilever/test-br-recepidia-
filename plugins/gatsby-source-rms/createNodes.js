exports.createRecipeNodes = (
  recipe,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`recipe-${recipe.id}`);

  createNode({
    ...recipe,
    id: nodeId,
    recipeId: recipe.id,
    parent: null,
    children: [],
    internal: {
      type: 'Recipe',
      contentDigest: createContentDigest(recipe),
    },
  });
};

const processTag = (
  tag,
  parentNodeId,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`tag-${tag.name}`);

  createNode({
    ...tag,
    id: nodeId,
    tagId: tag.id,
    parent: parentNodeId,
    children: [],
    internal: {
      type: 'Tag',
      contentDigest: createContentDigest(tag),
    },
  });
  return nodeId;
};

exports.createTagGroupingsNodes = (
  tagGroupings,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`tagGroupings-${tagGroupings.name}`);

  createNode({
    ...tagGroupings,
    id: nodeId,
    parent: null,
    children: tagGroupings.tags.map(tag =>
      processTag(tag, nodeId, {
        createNodeId,
        createContentDigest,
        createNode,
      })
    ),
    internal: {
      type: 'TagGroupings',
      contentDigest: createContentDigest(tagGroupings),
    },
  });
};
