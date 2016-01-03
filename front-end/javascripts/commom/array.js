define('app/utils/array', ['module', 'require', 'exports'], function(module, require, exports) {
  function flatten(a) {
    return a.reduce(function(a, b) {
      return a.concat(b);
    }, []);
  }
  function unique(a) {
    return a.filter(function(b, c) {
      return a.indexOf(b) == c;
    });
  }
  function compact(a) {
    return a.filter(function(a) {
      return typeof a != 'undefined' && a !== null;
    });
  }
  function grouped(a, b, c) {
    var c = c || [];
    return a.length ? grouped(a.slice(b), b, c.concat([a.slice(0, b)])) : c;
  }
  module.exports = {
    flatten: flatten,
    unique: unique,
    compact: compact,
    grouped: grouped
  };
});
