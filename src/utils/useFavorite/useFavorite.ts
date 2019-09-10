import { useState, useCallback } from 'react';
import { OnFavoriteChange } from 'src/components/lib/components/RecipeListing';

const useFavorite = (
  initFavorites: number[],
  updateFavorites: OnFavoriteChange
) => {
  const [favorites, setFavorites] = useState<number[]>(initFavorites);
  const updateFavoriteState: OnFavoriteChange = useCallback(
    (newFavorites: number[]) => {
      updateFavorites(newFavorites);
      setFavorites(newFavorites);
    },
    [setFavorites]
  );

  return { updateFavoriteState, favorites };
};

export default useFavorite;
