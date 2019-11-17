import { useState, useEffect } from 'react';
import { OnFavoriteChange } from 'src/components/lib/components/RecipeListing';

const useFavorite = (
  initFavorites: () => number[],
  updateFavorites: OnFavoriteChange
) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const updateFavoriteState: OnFavoriteChange = (newFavorites: number[]) => {
    updateFavorites(newFavorites);
    setFavorites(newFavorites);
  };

  useEffect(() => {
    setFavorites(initFavorites() || []);
  }, []);

  return { updateFavoriteState, favorites };
};

export default useFavorite;
