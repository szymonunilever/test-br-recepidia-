/* eslint-disable no-console */

const fs = require('fs');
const parser = require('xml2json');
const jmespath = require('jmespath');
const keys = require('lodash/keys');

module.exports = async ({
  newUrls,
  oldSitemapPath,
  oldDomain,
  JMESPathToUrls,
  redirectRules,
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
  const errors = [];

  oldUrls.forEach(item => {
    redirectRules.forEach(rule => {
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
        const mathcedUrl = newUrls.find(url => url.match(redirectToRule));

        if (mathcedUrl) {
          redirects.push({ from: item, to: mathcedUrl });
          unmappedUrls.splice(unmappedUrls.indexOf(mathcedUrl), 1);
        } else {
          errors.push(`${item} ${redirectToRule}`);
        }
      }
    });
  });

  fs.writeFileSync('unmappedUrls.txt', unmappedUrls.join('\n'));
  fs.writeFileSync('errors.txt', errors.join('\n'));

  console.log(`${redirects.length} redirect rules created`);

  const redirectsMap = redirects
    .map(item => `${item.from} ${item.to} ${redirectCode}`)
    .join('\n');

  console.log(redirectsMap);

  fs.writeFileSync('public/_redirects', redirectsMap);
};
