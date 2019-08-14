import { useState, useEffect } from 'react';

const useMedia = (
  queries: string[] = ['(min-width: 768px)'],
  values: number[] = [8, 6],
  debounceTimeout: number = 200
) => {
  let timerId: number;
  const defaultValue = Math.min(...values);

  const [value, setValue] = useState(defaultValue);

  const match = () => {
    const query = queries.findIndex(q => matchMedia(q).matches);
    return values[query] || defaultValue;
  };

  const clearTimeout = () => window.clearTimeout(timerId);

  const onResizeHandler = () => {
    clearTimeout();

    timerId = window.setTimeout(() => {
      setValue(match);
    }, debounceTimeout);
  };

  useEffect(() => {
    setValue(match);

    window.addEventListener('resize', onResizeHandler);

    return () => {
      clearTimeout();
      window.removeEventListener('resize', onResizeHandler);
    };
  }, []);

  return value;
};

export default useMedia;
