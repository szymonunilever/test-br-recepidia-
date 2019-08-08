import React from 'react';
import { OnFavoriteChange } from './models';

/*
  NOTICE!

  This hoc is intended to separate 'favorites' 
  and some other logic from RecipeListing component.
  
  Initial implementation. To be supplemented in future.

*/

const RecipeListingWithFavorites = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any,
  updateFavorites: OnFavoriteChange,
  favorites: string[],
  favoriteIcon: JSX.Element
  // eslint-disable-next-line react/display-name
) => ({ ...props }) => (
  // @ts-ignore
  <Component
    {...props}
    FavoriteIcon={favoriteIcon}
    withFavorite
    onFavoriteChange={updateFavorites}
    favorites={Array.isArray(favorites) ? favorites : []}
  />
);

export default RecipeListingWithFavorites;
