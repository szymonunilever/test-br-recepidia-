import React, { useEffect, useState } from 'react';
import keys from '../keys.json';
import Helmet from 'react-helmet';

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

  return (
    <>
      {locationOrigin ? (
        <Helmet
          script={[
            {
              src: 'https://code.jquery.com/jquery-3.4.1.min.js',
              integrity: 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=',
              crossOrigin: 'anonymous',
              defer: true,
            },
            { id: 'rr-widget', src: kritiqueWidgetSrc, defer: true },
          ]}
        />
      ) : null}
    </>
  );
};

export default Kritique;
