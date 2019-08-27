import React, { useEffect, useState } from 'react';
import keys from '../keys.json';
import Helmet from 'react-helmet';

// TODO: Integrations should be moved into lib folder
import { reloadKritiqueWidget } from '../../src/components/lib/utils/useKritiqueReload';

const Kritique = () => {
  const kritiqueWidgetSrc = `${keys.kritique.url}?brandid=${
    keys.kritique.brandId
  }&localeid=${keys.kritique.localeId}&apikey=${
    keys.kritique.apiKey
  }&sitesource=${keys.kritique.siteSource}`;

  const [locationOrigin, setLocationOrigin] = useState('');
  const [injectScript, setinjectScript] = useState(false);

  useEffect(() => {
    setLocationOrigin(window.location.origin);
    setTimeout(() => setinjectScript(true), 10000);
  }, []);

  // @ts-ignore
  const handleScriptInject = ({ scriptTags }) => {
    if (scriptTags) {
      const scriptTag = scriptTags.find(
        (el: HTMLElement) => el.id === 'rr-widget'
      );

      if (scriptTag) {
        scriptTag.onload = () => setTimeout(reloadKritiqueWidget, 2000);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeClientState = (newState: any, addedTags: any) =>
    handleScriptInject(addedTags);

  return (
    <>
      {locationOrigin && injectScript ? (
        <Helmet
          // @ts-ignore
          onChangeClientState={handleChangeClientState}
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
