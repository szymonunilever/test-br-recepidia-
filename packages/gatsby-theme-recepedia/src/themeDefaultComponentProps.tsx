import { ButtonViewType, FilterIcons } from 'gatsby-awd-components/src';
import React from 'react';
import { ReactComponent as OpenIcon } from './svgs/inline/arrow-down.svg';
import { ReactComponent as ClosedIcon } from './svgs/inline/arrow-up.svg';
import { ReactComponent as FavoriteIcon } from './svgs/inline/favorite.svg';
import { ReactComponent as FilterIcon } from './svgs/inline/filter.svg';
import { ReactComponent as RemoveRecipeCard } from './svgs/inline/dash.svg';
import {
  ReactComponent as RemoveTagIcon,
  ReactComponent as CloseSvg,
} from './svgs/inline/x-mark.svg';

export const favoriteButtonDefaults = {
  className: 'recipe-card__favorite action-button',
  Icon: FavoriteIcon,
  isToggle: true,
  viewType: ButtonViewType.icon,
  attributes: { 'aria-label': 'favorite toggle' },
};
export const removeRecipeCardButtonDefaults = {
  className: 'recipe-card__remove action-button',
  Icon: RemoveRecipeCard,
  viewType: ButtonViewType.icon,
  attributes: { 'aria-label': 'remove' },
};

export const RecipeListingIcons: FilterIcons = {
  close: CloseSvg,
  closed: ClosedIcon,
  filter: FilterIcon,
  open: OpenIcon,
  removeTag: RemoveTagIcon,
};
