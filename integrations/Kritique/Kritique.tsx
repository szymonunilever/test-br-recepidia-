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

  // @ts-ignore
  const isLoadKritique = (): boolean => window.isLoadKritique;
  const initKritique = () => {
    // @ts-ignore
    window.isLoadKritique = true;
    setInjectScript(true);
  };

  useEffect(() => {
    if (isLoadKritique()) {
      setInjectScript(isLoadKritique);
      setTimeout(reloadKritiqueWidget, 1000);
    } else if (document.readyState === 'complete') {
      initKritique();
    } else {
      // use mousemove and touchstart if WPT FPL need to be improved
      window.addEventListener('load', () => {
        initKritique();
      });
    }
  }, []);

  return (
    <>
      {isBrowser() && (isLoadKritique() || injectScript) ? (
        <Helmet
          // @ts-ignore
          script={[
            {
              id: 'rr-widget',
              src: kritiqueWidgetSrc,
              async: true,
            },
          ]}
        />
      ) : null}
    </>
  );
};

export default Kritique;
