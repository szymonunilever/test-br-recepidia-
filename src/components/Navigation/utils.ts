import cloneDeep from 'lodash/cloneDeep';

export const constructMenu = (
  categories: Internal.Category[],
  navigationContent: AppContent.GlobalNavigation.Content
): AppContent.GlobalNavigation.MenuItem[] => {
  const menuItems = cloneDeep(navigationContent);
  const recipeNav = menuItems.list.find(({ name }) => name === 'Receitas'); //TODO: It strange that we use localized name as Navigation item ID
  if (recipeNav) {
    const prevRecipeNavChildren = recipeNav.children;
    recipeNav.children = categories.map((category: Internal.Category) => {
      const categoriesInNav =
        category.children && category.children.filter(cat => cat.inNavigation);
      const recipesMenuItems: AppContent.GlobalNavigation.MenuItem = {
        name: category.title,
        path: !(category.children && category.children.length > 0)
          ? category.fields.slug
          : undefined,
        children:
          categoriesInNav &&
          categoriesInNav.sort((a, b) =>
            a.categoryOrder < b.categoryOrder ? -1 : 1
          ) &&
          categoriesInNav.map((subCategory: Internal.Category) => ({
            name: subCategory.title,
            path: subCategory.fields.slug,
          })),
      };
      return recipesMenuItems;
    });
    prevRecipeNavChildren &&
      prevRecipeNavChildren.splice(1, 0, ...recipeNav.children) &&
      (recipeNav.children = prevRecipeNavChildren);
  }

  return menuItems.list;
};
