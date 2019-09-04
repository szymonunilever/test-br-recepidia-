const getStaticLists = pageComponents =>
  pageComponents.reduce((res, current) => {
    if (current.content.hasOwnProperty('staticList')) {
      res[`${current.name}_${current.content.view}`] =
        current.content.staticList;
    }
    return res;
  }, {});

module.exports = getStaticLists;
