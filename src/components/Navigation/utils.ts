import cloneDeep from 'lodash/cloneDeep';
import { fromCamelCase, getTagSlug } from 'src/utils';

export const constructMenu = (
  tagGroups: Internal.TagGroup[],
  navigationContent: AppContent.GlobalNavigation.Content,
  recipeCategoryPath: string
): AppContent.GlobalNavigation.MenuItem[] => {
  const menuItems = cloneDeep(navigationContent);
  const recipeNav = menuItems.list.find(({ name }) => name === 'Recipes');
  if (recipeNav) {
    const prevRecipeNavChildren = recipeNav.children;
    recipeNav.children = tagGroups.map((tagGroup: Internal.TagGroup) => {
      const recipesMenuItems: AppContent.GlobalNavigation.MenuItem = {
        name: fromCamelCase(tagGroup.name),
        children: tagGroup.children.map((tag: Internal.Tag) => ({
          name: tag.name,
          path: getTagSlug(recipeCategoryPath, tag),
        })),
      };
      return recipesMenuItems;
    });

    prevRecipeNavChildren && recipeNav.children.push(...prevRecipeNavChildren);
  }

  return menuItems.list;
};
