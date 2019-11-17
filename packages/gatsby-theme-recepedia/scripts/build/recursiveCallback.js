const recursiveCallback = (object, propName, callback) => {
  typeof object === 'object' &&
    Object.keys(object).forEach(key => {
      if (key === propName) {
        object[key] = callback(object[key]);
      } else if (Array.isArray(object[key])) {
        object[key].forEach(item =>
          recursiveCallback(item, propName, callback)
        );
      } else if (typeof object[key] === 'object') {
        recursiveCallback(object[key], propName, callback);
      }
    });

  return object;
};

module.exports = recursiveCallback;
