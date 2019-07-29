exports.createRecipeNodes = (
  recipe,
  { createNodeId, createContentDigest, createNode }
) => {
  // Temporary solution to re-use existing components data structure
  // Should be reviewed as soon as we agree a common aproach and data structures to work with images
  const localImage = { childImageSharp: { fluid: {} } };
  localImage.childImageSharp.fluid = Object.assign(
    {},
    recipe.assets.images.default
  );

  recipe.localImage = localImage;

  delete recipe.assets;

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

const processTag = (
  tag,
  parentNodeId,
  { createNodeId, createContentDigest, createNode }
) => {
  const nodeId = createNodeId(`tag-${tag.name}`);
  const nodeContent = JSON.stringify(tag);
  const nodeData = Object.assign({}, tag, {
    id: nodeId,
    tagId: tag.id,
    parent: parentNodeId,
    children: [],
    internal: {
      type: 'Tag',
      content: nodeContent,
      contentDigest: createContentDigest(tag),
    },
  });
  createNode(nodeData);
  return nodeId;
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
    children: tagGroup.tags.map(tag =>
      processTag(tag, nodeId, {
        createNodeId,
        createContentDigest,
        createNode,
      })
    ),
    internal: {
      type: 'TagGroup',
      content: nodeContent,
      contentDigest: createContentDigest(tagGroup),
    },
  });

  createNode(nodeData);
};
