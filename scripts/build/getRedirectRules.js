const directUrlsMap = {
  '/momentos/dia-dia': '/dia-a-dia/',
  '/tipos-de-receita/bolo': '/categoria/bolos/',
  '/tipos-de-receita/peixe': '/categoria/peixes/',
  '/tipos-de-receita/carne': '/categoria/carnes/',
  '/tipos-de-receita/massa': '/categoria/massas/',
  '/tipos-de-receita/salada': '/categoria/saladas/',
  '/tipos-de-receita/sopa': '/categoria/sopas/',
};

const getFromCategoryOrTag = oldSiteFromUrlPartial => {
  const from = `${oldSiteFromUrlPartial}/(?<name>.+)`;

  return [
    {
      from,
      to: '/categoria/?<name>/$',
      otherwise: '/',
    },
    {
      from,
      to: '/?<name>/$',
      otherwise: '/',
    },
  ];
};

const getRedirectRules = () => [
  {
    from: '/(?<name>.+)',
    to: '/?<name>/$',
    otherwise: '/',
  },
  {
    from: '/receita/[0-9]*-(?<name>.+)',
    to: '/receita/.*/[0-9]*-?<name>/$',
    otherwise: '/receita/',
  },
  ...[
    '/dietas-especiais',
    '/tipos-de-receita',
    '/tipos-de-prato',
    '/momentos',
    '/cozinha',
  ].reduce((acc, oldSiteFromUrlPartial) => {
    acc.push(...getFromCategoryOrTag(oldSiteFromUrlPartial));
    return acc;
  }, []),
  ...Object.keys(directUrlsMap).map(key => ({
    from: key,
    to: directUrlsMap[key],
  })),
];

// console.log(getRedirectRules());

module.exports = getRedirectRules;
