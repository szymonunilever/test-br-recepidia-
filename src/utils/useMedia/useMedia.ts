import { useState, useEffect } from 'react';

function useMedia(
  queries: string[] = ['(min-width: 768px)', '(min-width: 767px)'],
  values: number[] = [8, 6]
) {
  const defaultValue = Math.min(...values);

  const match = () => {
    const query = queries.findIndex(q => matchMedia(q).matches);
    return values[query] || defaultValue;
  };

  const [value, set] = useState(defaultValue);

  useEffect(() => {
    set(match());
    const handler = () => set(match);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return value;
}

export default useMedia;
