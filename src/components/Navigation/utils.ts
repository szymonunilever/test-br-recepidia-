import { TagGroup, Tag } from '../models/Tags';

export const constructMenu = (
  tagGroups: TagGroup[]
): AppContent.GlobalNavigation.MenuItem[] => {
  const menuItems: AppContent.GlobalNavigation.MenuItem[] = [
    {
      name: 'Recipes',
      children: tagGroups.map((tagGroup: TagGroup) => {
        const recipesMenuItems: AppContent.GlobalNavigation.MenuItem = {
          name: tagGroup.name,
          children: tagGroup.children.map((tag: Tag) => ({
            name: tag.name,
            path: tag.fields.slug,
          })),
        };
        return recipesMenuItems;
      }),
    },
  ];
  menuItems.push({ name: 'Meal Planner', path: '/meal-planner' });

  return menuItems;
};
