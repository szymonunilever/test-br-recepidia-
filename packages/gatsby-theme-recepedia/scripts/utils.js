const parseArg = key => {
  const locale = process.argv.slice(2).find(item => {
    const arg = item.split('=');
    return arg && arg.length && arg[0] === key;
  });

  return locale ? locale.split('=')[1] : '';
};

module.exports = { parseArg };
