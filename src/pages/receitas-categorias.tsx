import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

// there is no page in designs but we need it to be generated for the sitemap
const RecipeCategoriesPage = () => {
  useEffect(() => {
    navigate('/');
  });
  return <></>;
};
export default RecipeCategoriesPage;
