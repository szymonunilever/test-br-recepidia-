export const constructMenu = (
  tagGroups: Internal.TagGroup[],
  navigationContent: AppContent.GlobalNavigation.Content
): AppContent.GlobalNavigation.MenuItem[] => {
  const recipeNav = navigationContent.list.find(
    ({ name }) => name === 'recipes'
  );
  if (recipeNav) {
    const prevRecipeNavChildren = recipeNav.children;
    recipeNav.children = tagGroups.map((tagGroup: Internal.TagGroup) => {
      const recipesMenuItems: AppContent.GlobalNavigation.MenuItem = {
        name: tagGroup.name,
        children: tagGroup.children.map((tag: Internal.Tag) => ({
          name: tag.name,
          path: tag.fields.slug,
        })),
      };
      return recipesMenuItems;
    });

    prevRecipeNavChildren && recipeNav.children.push(...prevRecipeNavChildren);
  }

  return navigationContent.list;
};
