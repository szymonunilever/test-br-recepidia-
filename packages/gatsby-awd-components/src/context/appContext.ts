import React from 'react';

const defaultContext = {
  brandLogoLink: '/',
  isExternalItemLink: false,
};

export const AppContext = React.createContext(defaultContext);
