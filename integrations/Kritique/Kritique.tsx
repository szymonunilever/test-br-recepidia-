import React, { useEffect, useState } from 'react';
import keys from '../keys.json';
import Helmet from 'react-helmet';
import useKritiqueReload from '../../src/utils/useKritiqueReload';

const Kritique = () => {
  const kritiqueWidgetSrc = `${keys.kritique.url}?brandid=${
    keys.kritique.brandId
  }&localeid=${keys.kritique.localeId}&apikey=${
    keys.kritique.apiKey
  }&sitesource=${keys.kritique.siteSource}`;

  const [locationOrigin, setLocationOrigin] = useState('');

  useEffect(() => {
    setLocationOrigin(window.location.origin);
  }, []);
  useKritiqueReload();

  return (
    <>
      {locationOrigin ? (
        <Helmet
          script={[
            {
              src: '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
              defer: true,
              async: true,
            },
            {
              id: 'rr-widget',
              src: kritiqueWidgetSrc,
              defer: true,
              async: true,
            },
          ]}
        />
      ) : null}
    </>
  );
};

export default Kritique;
