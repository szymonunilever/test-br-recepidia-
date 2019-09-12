/* eslint-disable no-console */

const oldDomain = 'https://br.recepedia.com';
const oldSitemapPath = ['./old-sitemap-1.xml', './old-sitemap-2.xml'];
const JMESPathToUrls = `"ns1:urlset"."ns1:url"[]."ns1:loc"`;
const redirectCode = 301;

const fs = require('fs');
const parser = require('xml2json');

module.exports = async pageNodes => {
  console.log('generating...');

  let json = {};
  oldSitemapPath.forEach(path => {
    const data = fs.readFileSync(path);
    const jsonData = parser.toJson(data, { object: true });

    if (!jsonData) {
      console.log('Old sitemap file is empty.');
      return;
    }

    json = { ...json, ...jsonData };
  });

  const jmespath = require('jmespath');
  const urls = jmespath.search(json, JMESPathToUrls);

  if (!urls || !urls.length) {
    console.log(
      'No URLs found by provided JMESPath. Check if the JMESPath is correct.'
    );
    return;
  }

  const oldUrls = urls.map(item => item.replace(oldDomain, ''));
  const newUrls = pageNodes
    .filter(item => item.fields && item.fields.slug)
    .map(item => item.fields.slug);

  const redirects = [];

  // /receita/184955-mini-tortas-com-creme-de-mel-e-banana
  // /receitas/18-mini-tortas-com-creme-de-mel-e-banana

  const redirectRules = [
    { from: '/receita/[0-9]*-(?<name>.+)', to: '/receitas/[0-9]*-?<name>$' },
  ];

  oldUrls.forEach(item => {
    redirectRules.forEach(rule => {
      const result = item.match(rule.from);

      if (result) {
        const redirectToRule = rule.to.replace('?<name>', result[1]);
        const mathcedUrl = newUrls.find(url => url.match(redirectToRule));
        if (mathcedUrl) {
          redirects.push({ from: item, to: mathcedUrl });
        }
      }
    });
  });

  console.log(`${redirects.length} redirect rules created`);

  const redirectsMap = redirects
    .map(item => `${item.from} ${item.to} ${redirectCode}`)
    .join('\n');

  console.log(redirectsMap);

  fs.writeFileSync('public/_redirects', redirectsMap);
};
