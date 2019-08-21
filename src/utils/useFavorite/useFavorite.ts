import { useState, useCallback } from 'react';
import RecipeListingWithFavorites from 'src/components/lib/components/RecipeListing/WithFavorites';

const useFavorite = (
  initFavorites: number[],
  updateFavorites: (favorites: number[]) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recipeListing: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any
) => {
  const [favorites, setFavorites] = useState(initFavorites || []);
  const updateFavoriteState = useCallback((favorites: number[]) => {
    updateFavorites(favorites);
    setFavorites(favorites);
  }, []);
  const RecipeListingWithFavorite = useCallback(
    RecipeListingWithFavorites(
      recipeListing,
      updateFavoriteState,
      favorites,
      icon
    ),
    [favorites]
  );
  return RecipeListingWithFavorite;
};

export default useFavorite;
