exports.createRecipeNodes = (
  recipe,
  { createNodeId, createContentDigest, createNode }
) => {
  // Temporary solution to re-use existing components data structure
  // Should be reviewed as soon as we agree a common approach and data structures to work with images
  recipe.localImage = {
    childImageSharp: { fluid: recipe.assets.images.default },
  };

  delete recipe.assets;

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
  { createNodeId, createContentDigest, createNode },
  dictionary
) => {
  const nodeId = createNodeId(`tag-${tag.id}`);
  tag['title'] =
    dictionary && dictionary[tag.name] ? dictionary[tag.name] : tag.name;
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
  { createNodeId, createContentDigest, createNode },
  dictionary
) => {
  const nodeId = createNodeId(`tagGroupings-${tagGroupings.name}`);
  const tags = tagGroupings.tags.filter(tag => tag && tag.id);
  const { name } = tagGroupings;
  tagGroupings['label'] =
    dictionary && dictionary[name] ? dictionary[name] : null;
  createNode({
    ...tagGroupings,
    id: nodeId,
    parent: null,
    children: tags.map(tag =>
      processTag(
        tag,
        nodeId,
        {
          createNodeId,
          createContentDigest,
          createNode,
        },
        dictionary
      )
    ),
    internal: {
      type: 'TagGroupings',
      contentDigest: createContentDigest(tagGroupings),
    },
  });
};
