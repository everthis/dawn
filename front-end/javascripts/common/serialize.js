/**
 * [serialize converts recursive objects]
 * @param  {[type]} obj    [description]
 * @param  {[type]} prefix [description]
 * @return {[type]}        [description]
 * console.log(serialize({foo: "hi there", bar: { blah: 123, quux: [1, 2, 3] }}));
 * foo=hi%20there&bar%5Bblah%5D=123&bar%5Bquux%5D%5B0%5D=1&bar%5Bquux%5D%5B1%5D=2&bar%5Bquux%5D%5B2%5D=3
 */
export function serialize(obj, prefix) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + '[' + p + ']' : p, v = obj[p];
      str.push(typeof v == 'object' ?
        serialize(v, k) :
        encodeURIComponent(k) + '=' + encodeURIComponent(v));
    }
  }
  return str.join('&');
}
