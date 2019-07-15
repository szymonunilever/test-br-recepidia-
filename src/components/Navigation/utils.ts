import { cloneDeep } from 'lodash';

export const constructMenu = (
  tagGroups: Internal.TagGroup[],
  navigationContent: AppContent.GlobalNavigation.Content
): AppContent.GlobalNavigation.MenuItem[] => {
  const menuItems = cloneDeep(navigationContent);
  const recipeNav = menuItems.list.find(({ name }) => name === 'Recipes');
  if (recipeNav) {
    const prevRecipeNavChildren = recipeNav.children;
    recipeNav.children = tagGroups.map((tagGroup: Internal.TagGroup) => {
      const recipesMenuItems: AppContent.GlobalNavigation.MenuItem = {
        name: tagGroup.name
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase()),
        children: tagGroup.children.map((tag: Internal.Tag) => ({
          name: tag.name,
          path: tag.fields.slug,
        })),
      };
      return recipesMenuItems;
    });

    prevRecipeNavChildren && recipeNav.children.push(...prevRecipeNavChildren);
  }

  return menuItems.list;
};
