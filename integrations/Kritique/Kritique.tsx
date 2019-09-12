import React, { useEffect, useState } from 'react';
import keys from '../keys.json';
import Helmet from 'react-helmet';

// TODO: Integrations should be moved into lib folder
import reloadKritiqueWidgetWIthTimeout from '../../src/components/lib/utils/useKritiqueReload';
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

  useEffect(() => {
    // will not be reloaded if widget is not loaded yes, so no issues for first time loading
    reloadKritiqueWidgetWIthTimeout();
  }, []);

  return (
    <>
      {isBrowser() ? (
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
