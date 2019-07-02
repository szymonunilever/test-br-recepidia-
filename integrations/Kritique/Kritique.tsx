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
    <Helmet>
      <script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
        crossOrigin="anonymous"
        defer
      />
      <script
        type="text/javascript"
        defer
        id="rr-widget"
        src={kritiqueWidgetSrc}
      />
      {/* apply this if needed */}
      {/* <script type="text/javascript" async src="/config/RR_widget_config.js" /> */}
      <link
        rel="stylesheet"
        type="text/css"
        href="//eu.kritique.io/widget/resources/css/RR_widget.css"
      />
    </Helmet>
  );
};

export default Kritique;
