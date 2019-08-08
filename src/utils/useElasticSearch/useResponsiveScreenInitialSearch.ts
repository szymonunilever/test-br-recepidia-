import { useEffect } from 'react';
import useMedia from '../useMedia';

function useResponsiveScreenInitialSearch(
  searchQuery: (size: number) => Promise<void>,
  listSize: number = 0,
  mediaQueries?: string[],
  values?: number[]
): number {
  const initialRecipesCount = useMedia(mediaQueries, values);

  useEffect(() => {
    if (initialRecipesCount > listSize) {
      searchQuery(initialRecipesCount);
    }
  }, [initialRecipesCount]);

  return initialRecipesCount;
}

export default useResponsiveScreenInitialSearch;
