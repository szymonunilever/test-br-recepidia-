export const getTagsFromRecipes = (
  recipeList: Internal.Recipe[],
  tagNodeList: Internal.Tag[]
) =>
  recipeList.reduce((tagList: Internal.Tag[], recipe) => {
    recipe.tagGroups.forEach(
      tagGroup =>
        tagGroup.tags &&
        tagGroup.tags.forEach(tag => {
          if (tagList.find(({ tagId }) => tagId === tag.id)) {
            return;
          }

          const tagNode = tagNodeList.find(({ tagId }) => {
            return tagId === tag.id;
          });

          if (tagNode) {
            tagList.push(tagNode);
          }
        })
    );

    return tagList;
  }, []);
