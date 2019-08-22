import React from 'react';
import PropTypes from 'prop-types';
import keys from 'integrations/keys.json';
const { applicationID, licenseKey } = keys.sitespeed;

export default function HTML(props) {
  const kritiqueWidgetSrc = `${keys.kritique.url}?brandid=${
    keys.kritique.brandId
  }&localeid=${keys.kritique.localeId}&apikey=${
    keys.kritique.apiKey
  }&sitesource=${keys.kritique.siteSource}`;
  let headComponents = props.headComponents;
  let css;
  if (process.env.NODE_ENV == `production`) {
    headComponents = headComponents.filter(
      component => component.type !== 'style'
    );
    css = (
      <>
        <link rel="stylesheet" href="/styles.css" />
      </>
    );
  }

  return (
    <html {...props.htmlAttributes}>
      <head>
        {process.env.NODE_ENV !== 'development' && (
          <>
            <link rel="preload" href="/config/newRelic.js" as="script" />
            <link rel="preload" href="/styles.css" as="style" />
            <link rel="preload" href="/assets/fonts/Rubik.css" as="style" />
            <link
              rel="preload"
              href="/assets/fonts/iJWHBXyIfDnIV7Eyjmmd8WA.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
            <link rel="preload" href="/libs/jquery.min.js" as="script" />
            <link
              rel="preload"
              href={`${
                keys.kritique.baseUrl
              }/widget/resources/css/RR_widget.css`}
              as="style"
            />
            <link rel="preload" href={kritiqueWidgetSrc} as="script" />
            <link
              rel="preconnect"
              href="https://d37k6lxrz24y4c.cloudfront.net"
            />
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <link rel="preconnect" href="https://js-agent.newrelic.com" />
            <script
              type="text/javascript"
              src="/config/newRelic.js"
              id="newRelic"
            />
            <script
              id="newRelicConfig"
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `NREUM.info={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",licenseKey:"${licenseKey}",applicationID:"${applicationID}",sa:1}`,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(g, b, d, f) {
                    (function(a, c, d) {
                      if (a) {
                        var e = b.createElement("style");
                        e.id = c;
                        e.innerHTML = d;
                        a.appendChild(e);
                      }
                    })(b.getElementsByTagName("head")[0], "at-body-style", d);
                    setTimeout(function() {
                      var a = b.getElementsByTagName("head")[0];
                      if (a) {
                        var c = b.getElementById("at-body-style");
                        c && a.removeChild(c);
                      }
                    }, f);
                  })(window, document, "body {opacity: 0 !important}", 3e3);
                `,
              }}
            />
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
        {headComponents}
        {css}
        <link href="/assets/fonts/Rubik.css" rel="stylesheet" />
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
