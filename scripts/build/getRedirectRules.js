const getFromCategoryOrTag = oldSiteFromUrlPartial => {
  const from = `${oldSiteFromUrlPartial}/(?<name>.+)`;

  return [
    {
      from,
      to: '/categoria/?<name>$',
      otherwise: '/',
    },
    {
      from,
      to: '/?<name>$',
      otherwise: '/',
    },
  ];
};

const getRedirectRules = () => [
  {
    from: '/receita/[0-9]*-(?<name>.+)',
    to: '/receita/.*/[0-9]*-?<name>$',
    otherwise: '/receita',
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
];

module.exports = getRedirectRules;
