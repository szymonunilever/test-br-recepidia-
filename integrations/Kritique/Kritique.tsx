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

  const [injectScript, setInjectScript] = useState(false);

  const initKritique = () => {
    sessionStorage.setItem('isKritiqueLoaded', 'true');
    setInjectScript(true);
  };

  useEffect(() => {
    const isKritiqueLoaded = !!sessionStorage.getItem('isKritiqueLoaded');

    if (isKritiqueLoaded) {
      setInjectScript(isKritiqueLoaded);
      setTimeout(reloadKritiqueWidget, 1000);
    } else {
      // use mousemove and touchstart if WPT FPL need to be improved
      window.addEventListener('load', () => {
        initKritique();
      });
    }
  }, []);

  return (
    <>
      {isBrowser() &&
      (!!sessionStorage.getItem('isKritiqueLoaded') || injectScript) ? (
        <Helmet
          // @ts-ignore
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
