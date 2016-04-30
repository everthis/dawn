export function flatten(a) {
  return a.reduce(function(a, b) {
    return a.concat(b);
  }, []);
}
export function unique(a) {
  return a.filter(function(b, c) {
    return a.indexOf(b) == c;
  });
}
export function compact(a) {
  return a.filter(function(a) {
    return typeof a != 'undefined' && a !== null;
  });
}
export function grouped(a, b, c) {
  var c = c || [];
  return a.length ? grouped(a.slice(b), b, c.concat([a.slice(0, b)])) : c;
}