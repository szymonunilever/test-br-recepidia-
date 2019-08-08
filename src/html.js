import React from 'react';
import PropTypes from 'prop-types';
import keys from 'integrations/keys.json';

export default function HTML(props) {
  const kritiqueWidgetSrc = `${keys.kritique.url}?brandid=${
    keys.kritique.brandId
  }&localeid=${keys.kritique.localeId}&apikey=${
    keys.kritique.apiKey
  }&sitesource=${keys.kritique.siteSource}`;

  const { applicationID, licenseKey, locale } = keys.sitespeed;

  let headComponents = props.headComponents;
  let css;
  if (process.env.NODE_ENV == `production`) {
    headComponents = headComponents.filter(
      component => component.type !== 'style'
    );
    css = (
      <>
        <link rel="preload" as="style" href="/styles.css" />
        <link rel="stylesheet" href="/styles.css" />
      </>
    );
  }

  return (
    <html {...props.htmlAttributes}>
      <head>
        {process.env.NODE_ENV !== 'development' && (
          <>
            <link
              rel="preload"
              href="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"
              as="script"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `

                var digitalData = {};
                digitalData.sitespeed = [];
                digitalData.sitespeed.applicationID = ${applicationID};
                digitalData.sitespeed.licenseKey = "${licenseKey}";
                digitalData.sitespeed.locale = "${locale}";

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

            <link rel="preload" href={keys.analytics.adobe.url} as="script" />
            <link rel="preload" href={kritiqueWidgetSrc} as="script" />
            <link
              rel="preconect"
              href="https://d37k6lxrz24y4c.cloudfront.net"
            />
            <script
              type="text/javascript"
              src={keys.analytics.adobe.url}
              defer
            />
          </>
        )}
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {headComponents}
        {css}
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
