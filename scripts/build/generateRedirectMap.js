/* eslint-disable no-console */

const fs = require('fs');
const parser = require('xml2json');
const jmespath = require('jmespath');
const keys = require('lodash/keys');
const partition = require('lodash/partition');
const customRedirects = {
  '/search/estrogonofe': '/procurar?searchQuery=estrogonofe',
  '/tipos-de-receita/massas': '/categoria/massas/',
  '/search/pudim': '/procurar?searchQuery=pudim',
  '/receita/187204-panqueca-de-carne-moida-pratica-com-molho-de-tomate':
    '/receita/',
  '/search/bolinho de chuva': '/procurar/?searchQuery=bolinho%20de%20chuva',
  '/receita/186634-feijoada-completa-tradicional-deliciosa': '/receita/',
  '/search/bolo de chocolate': '/procurar?searchQuery=bolo%20de%20chocolate',
  '/receita/187033-salada-de-batata-pratica-e-deliciosa-com-ovo-e-maionese':
    '/receita/',
  '/panqueca-de-carne/receitas/187204': '/receita/',
  '/search/lasanha': '/procurar?searchQuery=lasanha',
  '/receita/197611-tapioca-de-peito-de-peru-e-ricota-com-becel': '/receita/',
  '/search/panqueca': '/procurar?searchQuery=panqueca',
  '/receita/186943-macarrao-cremoso-incrementado-com-presunto-queijo-e-tomate':
    '/receita/arroz/36811-arroz-cremoso-com-presunto-queijo-e-tomate/',
  '/receita/187204-panqueca-de-carne':
    '/receita/panquecas-e-waffles/177590-panqueca-de-carne/',
  '/search/arroz': '/procurar?searchQuery=arroz',
  '/search/salada': '/procurar?searchQuery=salada',
  '/receita/186900-torta-de-frango-facil-e-cremosa-de-liquidificador-com-ervilha-e-milho':
    '/receita/',
  '/search/Sanduiche': '/procurar?searchQuery=Sanduiche',
  '/pudim-de-leite-condensado/receitas/195555': '/receita/',
  '/bolo-de-cenoura-com-cobertura-de-chantilate/receitas/197624':
    '/categoria/bolos/',
  '/arroz-colorido/receitas/187545': '/arroz/',
  '/receita/187026-carne-moida-cozida-com-quiabo': '/receita/',
  '/receita/197472-bolo-de-chocolate-simples-e-fofinho-com-cobertura-cremosa':
    '/receita/',
  '/search/risoto': '/procurar?searchQuery=risoto',
  '/receita/185212-rocambole-facil-de-carne-moida-recheado-com-presunto-e-queijo':
    '/receita/',
  '/search/torta de liquidificador':
    '/procurar?searchQuery=torta%20de%20liquidificador',
  '/search/bolo': '/procurar?searchQuery=bolo',
  '/search/pizzaEncontre no Site de Recepedia Deliciosas Receitas de Pizzas.':
    '/procurar?searchQuery=pizzaEncontre%20no%20Site%20de%20Recepedia%20Deliciosas%20Receitas%20de',
  '/search/mousse de maracuja': '/procurar/?searchQuery=mousse%20de%20maracuja',
  '/search/churrasco': '/procurar?searchQuery=churrasco',
  '/search/torta': '/procurar?searchQuery=torta',
  '/search/pizza': '/procurar?searchQuery=pizza',
  '/search/vitamina': '/procurar?searchQuery=vitamina',
  '/search/arroz de forno': '/procurar?searchQuery=arroz de forno',
  '/search': '/procurar?searchQuery=',
  '/search/nhoque': '/procurar?searchQuery=nhoque',
  '/search/salada de macarrao': '/procurar?searchQuery=salada de macarrao',
  '/search/chantibon': '/procurar?searchQuery=chantibon',
  '/search/paste': '/procurar?searchQuery=paste',
  '/receita/187202-salpicao-de-frango-pratico-com-cenoura-batata-milho-e-salsao':
    '/receita/',
  '/receita/197881-bolo-simples-de-cacau': '/receita/',
  '/receita/186943-macarrao': '/receita/',
  '/salpicao-de-frango-e-legumes/receitas/187202': '/receita/',
  '/receita/186942-batata-gratinada-facil': '/receita/',
  '/receita/186086-bolo-de-mandioca': '/receita/',
  '/receita/197624-bolo-de-cenoura-com-cobertura-de-sorvete-e-chocolate': '/receita/',
  '/receita/185922-carne-moida-macia-cozida-com-mandioquinha': '/receita/',
  '/receita/186904-frango-empanado-crocante-ao-forno': '/receita/',
  '/receita/184975-frango-assado-suculento-com-batatas-douradas': '/receita/',
  '/receita/197597-baiao-de-dois-tradicional': '/receita/',
  '/receita/185175-arroz-cremoso-com-presunto-queijo-e-tomate': '/receita/',
  '/receita/187030-bife-acebolado-de-file-mignon-com-pimentao-e-tomate': '/receita/',
  '/tutu-de-feijao/receitas/186805': '/receita/',
  '/muffins-com-recheio-de-morango/receitas/197637': '/receita/',
  '/receita/185104-arroz-cremoso-e-rapido-com-atum-e-maionese-hellmanns': '/receita/',
  '/receita/197653-hamburguer-caseiro-com-molho-especial-de-alho': '/receita/',
  '/bolo-de-cenoura-com-laranja/receitas/185090': '/receita/',
  '/arroz-cremoso-com-vegetais/receitas/185204': '/receita/',
  '/receita/197667-bolo-de-fuba-com-maizena': '/receita/',
  '/receita/197804-bolo-de-fuba-fofinho-e-facil': '/receita/',
  '/receita/185574-frigideira-de-frango-pratica-com-pimentao-tomate-e-cebola': '/receita/',
  '/sorvete-de-mousse-de-maracuja/receitas/193031': '/receita/',
  '/receita/185889-arroz-com-verduras-rapido': '/receita/',
  '/receita/187201-sopa-creme-de-lentilha-e-legumes-nutritiva': '/receita/',
  '/receita/185740-pure-de-batata-simples-e-cremoso': '/receita/',
  '/receita/185763-arroz-nutritivo-incrementado-com-cenoura-e-milho':
    '/receita/',
  '/receita/197805-bolo-de-milho-fofinho': '/receita/',
  '/creme-de-abacate-com-frutas-vermelhas/receitas/197607': '/receita/',
  '/almondegas-ao-forno/receitas/197595': '/receita/',
  '/receita/185226-bolo-recheado-com-sorvete': '/receita/',
  '/receita/197525-creme-de-legumes-saboroso-e-encorpado': '/receita/',
  '/receita/185778-bife-de-file-mignon-grelhado-com-alecrim': '/receita/',
  '/receita/197856-bolinhos-cremosos-de-arroz-e-legumes': '/receita/',
  '/panquecas-americanas-com-frutas-e-mel/receitas/197640': '/receita/',
  '/torta-de-biscoito-com-sorvete-chantibon/receitas/197630': '/receita/',
  '/receita/197845-molho-chimichurri-cremoso-para-churrasco': '/receita/',
  '/mousse-de-maracuja-rapido/receitas/193841': '/receita/',
  '/receita/185782-costela-suculenta-assada-no-forno-e-recheada-com-mandioca':
    '/receita/',
  '/receita/186086-bolo-de-mandioca-fofinho-com-coco-ralado': '/receita/',
  '/receita/186045-macarrao-com-abobrinha-tomate-e-queijo': '/receita/',
  '/receita/187037-salada-pratica-de-macarrao-parafuso-com-kani-kama':
    '/receita/',
  '/receita/186805-tutu-de-feijao-saboroso-com-bacon-e-linguica': '/receita/',
  '/frango-com-quiabo/receitas/197483': '/receita/',
  '/salada-de-batata-com-atum/receitas/187034': '/receita/',
  '/receita/197690-sanduiche-de-file-de-frango-com-queijo-salada-e-maionese':
    '/receita/',
  '/receita/197714-bolo-formigueiro-facil-e-rapido': '/receita/',
  '/receita/197717-bolo-de-leite-simples': '/receita/',
  '/receita/186695-iscas-de-figado-refogadas-com-pimentao': '/receita/',
};

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

  Object.keys(customRedirects).forEach(fromUrl =>
    redirects.push({
      from: fromUrl,
      to: customRedirects[fromUrl],
    })
  );
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
