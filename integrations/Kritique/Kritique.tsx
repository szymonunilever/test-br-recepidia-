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

  const [scriptInjected, setScriptInjected] = useState(false);

  useEffect(() => {
    const isKritiqueLoaded = !!sessionStorage.getItem('isKritiqueLoaded');

    if (isKritiqueLoaded) {
      setScriptInjected(isKritiqueLoaded);
      setTimeout(reloadKritiqueWidget, 2000);
    } else {
      window.addEventListener('load', () => {
        sessionStorage.setItem('isKritiqueLoaded', 'true');
        setScriptInjected(true);
      });
    }
  }, []);

  return (
    <>
      {isBrowser() &&
      (!!sessionStorage.getItem('isKritiqueLoaded') || scriptInjected) ? (
        <Helmet
          script={[
            {
              src: '/libs/jquery.min.js',
              defer: true,
            },
            {
              id: 'rr-widget',
              src: kritiqueWidgetSrc,
              defer: true,
            },
          ]}
        />
      ) : null}
    </>
  );
};

export default Kritique;
