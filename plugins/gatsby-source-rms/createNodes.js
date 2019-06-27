exports.createRecipeNodes = (
  recipe,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`recipe-${recipe.id}`);
  const nodeContent = JSON.stringify(recipe);
  const nodeData = Object.assign({}, recipe, {
    id: nodeId,
    recipeId: recipe.id,
    parent: null,
    children: [],
    internal: {
      type: 'Recipe',
      content: nodeContent,
      contentDigest: createContentDigest(recipe),
    },
  });
  createNode(nodeData);
};

const processTag = (tag, { createNodeId, createContentDigest, createNode }) => {
  const nodeId = createNodeId(`tag-${tag.name}`);
  const nodeContent = JSON.stringify(tag);
  const nodeData = Object.assign({}, tag, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: 'Tag',
      content: nodeContent,
      contentDigest: createContentDigest(tag),
    },
  });
  return createNode(nodeData);
};

exports.createTagGroupNodes = (
  tagGroup,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`tagGroup-${tagGroup.name}`);
  const nodeContent = JSON.stringify(tagGroup);
  const nodeData = Object.assign({}, tagGroup, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: 'TagGroup',
      content: nodeContent,
      contentDigest: createContentDigest(tagGroup),
    },
  });

  // tagGroup[`tags___NODE`] = tags;

  createNode(nodeData);

  tagGroup.tags.map(tag =>
    processTag(tag, {
      createNodeId,
      createContentDigest,
      createNode,
    })
  );
};
