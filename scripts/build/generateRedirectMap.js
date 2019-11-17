/* eslint-disable no-console */

const fs = require('fs');
const parser = require('xml2json');
const jmespath = require('jmespath');
const keys = require('lodash/keys');
const partition = require('lodash/partition');

module.exports = async ({
  newUrls,
  oldSitemapPath,
  oldDomain,
  JMESPathToUrls,
  redirectRules,
  otherwiseRedirectTo,
  redirectCode = 301,
}) => {
  let urls = [];

  oldSitemapPath.forEach(path => {
    const data = fs.readFileSync(path);
    const jsonData = parser.toJson(data, { object: true });

    if (!jsonData) {
      console.log('Old sitemap file is empty.');
      return;
    }

    urls = [...urls, ...jmespath.search(jsonData, JMESPathToUrls)];
  });

  if (!urls || !urls.length) {
    console.log(
      'No URLs found by provided JMESPath. Check if the JMESPath is correct.'
    );
    return;
  }

  const oldUrls = urls.map(url => url.replace(oldDomain, ''));
  let unmappedOldUrls = [...oldUrls];
  let unmappedUrls = [...newUrls];
  const redirects = [];
  for (let url of oldUrls) {
    const equal = newUrls.find(
      newUrl => newUrl === url || newUrl === `${url}/`
    );
    if (equal) {
      unmappedOldUrls.splice(unmappedOldUrls.indexOf(url), 1);
      unmappedUrls.splice(unmappedUrls.indexOf(equal), 1);
      continue;
    }
    const urlRedirects = [];
    for (let rule of redirectRules) {
      const result = url.match(rule.from);
      if (result) {
        let redirectToRule = rule.to;
        if (result.groups) {
          keys(result.groups).forEach(
            key =>
              (redirectToRule = redirectToRule.replace(
                `?<${key}>`,
                result.groups[key]
              ))
          );
        }

        const matchedUrl = newUrls.find(url => url.match(redirectToRule));

        if (matchedUrl) {
          const existRedirect = urlRedirects.find(
            redirect => redirect.from === url
          );
          if (!existRedirect) {
            urlRedirects.push({ from: url, to: matchedUrl });
            if (unmappedOldUrls.indexOf(url) !== -1) {
              unmappedOldUrls.splice(unmappedOldUrls.indexOf(url), 1);
            }
            if (unmappedUrls.indexOf(matchedUrl) !== -1) {
              unmappedUrls.splice(unmappedUrls.indexOf(matchedUrl), 1);
            }
          } else {
            if (existRedirect.to === rule.otherwise) {
              existRedirect.to = matchedUrl;
              if (unmappedOldUrls.indexOf(url) !== -1) {
                unmappedOldUrls.splice(unmappedOldUrls.indexOf(url), 1);
              }
              if (unmappedUrls.indexOf(matchedUrl) !== -1) {
                unmappedUrls.splice(unmappedUrls.indexOf(matchedUrl), 1);
              }
            }
          }
        } else {
          urlRedirects.push({
            from: url,
            to: rule.otherwise,
            ['isOtherwise']: true,
          });
        }
      }
    }

    if (urlRedirects.length) {
      const [otherwiseRedirects, nonOtherwiseRedirects] = partition(
        urlRedirects,
        ['isOtherwise', true]
      );
      const appliedRedirect = nonOtherwiseRedirects.length
        ? nonOtherwiseRedirects[0]
        : otherwiseRedirects[0];
      redirects.push(appliedRedirect);
    } else {
      redirects.push({ from: url, to: otherwiseRedirectTo });
    }
  }
  // For debug purposes only
  fs.writeFileSync('unmappedNewUrls.txt', unmappedUrls.join('\n'));
  fs.writeFileSync('oldUrlsMappedToRoot.txt', unmappedOldUrls.join('\n'));

  console.log(`${redirects.length} redirect rules created`);

  const redirectsMap = redirects
    .map(item => `${item.from} ${item.to} ${redirectCode}`)
    .join('\n');

  // use to see log in Netlify
  // console.log(redirectsMap);

  fs.writeFileSync('public/_redirects', redirectsMap);
};
