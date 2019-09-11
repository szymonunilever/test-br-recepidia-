import React, { useEffect, useState } from 'react';
import keys from '../keys.json';
import Helmet from 'react-helmet';

// TODO: Integrations should be moved into lib folder
import { reloadKritiqueWidget } from '../../src/components/lib/utils/useKritiqueReload';
import { isBrowser } from 'src/utils';

export enum ScriptType {
  jQuery = 'jQuery',
  Kritique = 'ratingReview',
}

const Kritique = () => {
  const kritiqueWidgetSrc = `${keys.kritique.url}?brandid=${
    keys.kritique.brandId
  }&localeid=${keys.kritique.localeId}&apikey=${
    keys.kritique.apiKey
  }&sitesource=${keys.kritique.siteSource}`;

  const [injectScript, setInjectScript] = useState(false);

  useEffect(() => {
    const isKritiqueLoaded = !!sessionStorage.getItem('isKritiqueLoaded');

    if (isKritiqueLoaded) {
      setInjectScript(isKritiqueLoaded);
      setTimeout(reloadKritiqueWidget, 2000);
    } else {
      setTimeout(() => {
        sessionStorage.setItem('isKritiqueLoaded', 'true');
        setInjectScript(true);
      }, 0);
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
