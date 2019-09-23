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

  const oldUrls = urls.map(item => item.replace(oldDomain, ''));
  const unmappedUrls = [...newUrls];
  const redirects = [];

  oldUrls.forEach(item => {
    let isUrlMatched = false;
    const urlRedirects = [];

    for (let rule of redirectRules) {
      const result = item.match(rule.from);
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

        const mathchedUrl = newUrls.find(url => url.match(redirectToRule));

        if (mathchedUrl) {
          urlRedirects.push({ from: item, to: mathchedUrl });
          unmappedUrls.splice(unmappedUrls.indexOf(mathchedUrl), 1);
          // only one redirect URL is available which is not isOtherwise so the first matched URL will be used
          break;
        } else {
          urlRedirects.push({
            from: item,
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
      redirects.push({ from: item, to: otherwiseRedirectTo });
    }
  });

  // For debug purposes only
  fs.writeFileSync('unmappedNewUrls.txt', unmappedUrls.join('\n'));

  console.log(`${redirects.length} redirect rules created`);

  const redirectsMap = redirects
    .map(item => `${item.from} ${item.to} ${redirectCode}`)
    .join('\n');

  console.log(redirectsMap);

  fs.writeFileSync('public/_redirects', redirectsMap);
};
