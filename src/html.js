import React from 'react';
import PropTypes from 'prop-types';
import newRelic from '../static/config/newRelic';

const kritiqueWidgetSrc = `${process.env['kritique_url']}?brandid=${
  process.env['kritique_brandId']
}&localeid=${process.env['kritique_localeId']}&apikey=${
  process.env['kritique_apiKey']
}&sitesource=${process.env['kritique_siteSource']}`;

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        {process.env.NODE_ENV !== 'development' && (
          <>
            {/* START preconnects */}
            <link
              rel="preconnect"
              href={process.env['app_local_elasticSearch_searchUrl']}
            />
            <link
              rel="preconnect"
              href="https://d37k6lxrz24y4c.cloudfront.net"
            />
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <link rel="preconnect" href="https://bam.nr-data.net" />
            <link rel="preconnect" href="https://js-agent.newrelic.com" />
            {/* END preconnects */}

            {/* START kritique preloads */}
            <link
              rel="preload"
              href="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"
              as="script"
            />
            <link rel="preload" href={kritiqueWidgetSrc} as="script" />
            <link
              rel="preload"
              href={`${
                process.env['kritique_baseUrl']
              }/widget/resources/css/RR_widget.css`}
              as="style"
            />
            {/* END kritique preloads */}

            {/* START NewRelic */}

            {/* Having script inline improves FCP/FMP. Loading newRelic script async is not allowed*/}
            <script type="text/javascript" dangerouslySetInnerHTML={newRelic} />
            {/* <script
              type="text/javascript"
              src="/config/newRelicScript.js"
              id="newRelicScript"
            />
            <script
              type="text/javascript"
              id="newRelicConfig"
              dangerouslySetInnerHTML={{
                __html: `NREUM.info={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",licenseKey:"${
                  process.env['sitespeed_licenseKey']
                }",applicationID:"${
                  process.env['sitespeed_applicationID']
                }",sa:1}`,
              }}
            /> */}
            {/* END NewRelic */}

            {/* Evidon Cookie popup */}
            {/* <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
              (function(w){
                w.addEventListener('load', function() {
                  var head = document.getElementsByTagName('head')[0];
                  var script = document.createElement('script');
                  script.type = 'text/javascript';
                  script.src = '//assets.adobedtm.com/launch-EN778e3b07c50b4ae08fac5c37112ab05d.min.js';
                  head.appendChild(script);
                });
              })(window);
              `,
              }}
              id="evidon"
            /> */}
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
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
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
