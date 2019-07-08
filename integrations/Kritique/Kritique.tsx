import React from 'react';
import keys from '../keys.json';
import Helmet from 'react-helmet';

const Kritique = () => {
  const kritiqueWidgetSrc = `${keys.kritique.url}?brandid=${
    keys.kritique.brandId
  }&localeid=${keys.kritique.localeId}&apikey=${
    keys.kritique.apiKey
  }&sitesource=${keys.kritique.siteSource}`;

  return (
    <Helmet
      script={[
        {
          src: 'http://url.com/script.js',
          integrity: 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=',
          crossOrigin: 'anonymous',
          defer: true,
        },
        { id: 'rr-widget', src: kritiqueWidgetSrc, defer: true },
      ]}
    />
  );
};

export default Kritique;
