import React, { useState, useEffect } from 'react';
import { RecipeListViewType } from './models';

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
const ResponsiveRecipeListing = (Component: any, mobileBreakpoint: number) => ({
  ...props
}) => {
  const [updateKey, setUpdateKey] = useState<number>(0);
  const initViewType = props.viewType;
  const [dynamicViewType, setViewType] = useState<RecipeListViewType>(
    initViewType
  );

  const adjustViewType = () => {
    const newViewType =
      window.innerWidth >= mobileBreakpoint
        ? initViewType
        : RecipeListViewType.Carousel;
    if (newViewType !== dynamicViewType) {
      setViewType(newViewType);
    }
  };

  useEffect(() => {
    adjustViewType();
  }, [updateKey]);

  useEffect(() => {
    const resizeHandler = () => setUpdateKey(updateKey + Math.random());
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return <Component {...props} viewType={dynamicViewType} />;
};

export default ResponsiveRecipeListing;
