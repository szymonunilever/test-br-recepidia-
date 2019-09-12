import React from 'react';
import PropTypes from 'prop-types';
import newRelic from '../static/config/newRelic';
import keys from 'integrations/keys.json';

export default function HTML(props) {
  const kritiqueWidgetSrc = `${keys.kritique.url}?brandid=${
    keys.kritique.brandId
  }&localeid=${keys.kritique.localeId}&apikey=${
    keys.kritique.apiKey
  }&sitesource=${keys.kritique.siteSource}`;

  return (
    <html {...props.htmlAttributes}>
      <head>
        {process.env.NODE_ENV !== 'development' && (
          <>
            <link rel="preconnect" href={keys.elasticSearch.url} />
            <link
              rel="preconnect"
              href="https://d37k6lxrz24y4c.cloudfront.net"
            />
            {/* <link rel="preconnect" href="https://www.google-analytics.com" /> */}
            {/* <link rel="preconnect" href="https://bam.nr-data.net" /> */}
            {/* <link rel="preconnect" href="https://js-agent.newrelic.com" /> */}

            {/* START kritique preloads */}
            {/* <link
              rel="preload"
              href="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"
              as="script"
            />
            <link rel="preload" href={kritiqueWidgetSrc} as="script" />
            <link
              rel="preload"
              href={`${
                keys.kritique.baseUrl
              }/widget/resources/css/RR_widget.css`}
              as="style"
            /> */}
            {/* END kritique preloads */}

            <script type="text/javascript" src="/config/newRelicScript.js" />
          </>
        )}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
          (function(a, h){
            var botsRegexp = /aolbuild|baidu|bingbot|bingpreview|msnbot|duckduckgo|adsbot-google|googlebot|mediapartners-google|teoma|slurp|yandex/gi;
            window.searchAgentOnPage = h && h==='#noquiz' || botsRegexp.test(a);
          })(navigator.userAgent, location.hash);
          `,
          }}
          id="botDetector"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
