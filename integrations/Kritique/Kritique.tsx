import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';

// TODO: Integrations should be moved into lib folder
import reloadKritiqueWidget from 'src/components/lib/utils/useKritiqueReload';
import { isBrowser } from 'src/utils';

const Kritique = () => {
  const kritiqueWidgetSrc = `${process.env['kritique_url']}?brandid=${
    process.env['kritique_brandId']
  }&localeid=${process.env['kritique_localeId']}&apikey=${
    process.env['kritique_apiKey']
  }&sitesource=${process.env['kritique_siteSource']}`;

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
      setTimeout(reloadKritiqueWidget());
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
