import React, { useEffect, useState } from 'react';
import keys from '../keys.json';
import Helmet from 'react-helmet';

// TODO: Integrations should be moved into lib folder
import { reloadKritiqueWidget } from '../../src/components/lib/utils/useKritiqueReload';
import { isBrowser } from 'src/utils';

const Kritique = () => {
  const kritiqueWidgetSrc = `${keys.kritique.url}?brandid=${
    keys.kritique.brandId
  }&localeid=${keys.kritique.localeId}&apikey=${
    keys.kritique.apiKey
  }&sitesource=${keys.kritique.siteSource}`;

  const setLoadKritique = () => {
    // @ts-ignore
    window.isKritiqueLoaded = true;
  };

  useEffect(() => {
    // @ts-ignore
    window.isKritiqueLoaded
      ? setTimeout(reloadKritiqueWidget, 1000)
      : setLoadKritique();
  }, []);

  return (
    <>
      {isBrowser() && (
        <Helmet
          // @ts-ignore
          script={[
            // {
            //   src: '/libs/jquery.min.js',
            //   defer: true,
            // },
            {
              id: 'rr-widget',
              src: kritiqueWidgetSrc,
              defer: true,
            },
          ]}
        />
      )}
    </>
  );
};

export default Kritique;
